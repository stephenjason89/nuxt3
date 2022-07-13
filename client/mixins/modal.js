import { convertDateTime, singular } from '~/assets/js/utils.js'
import { modal } from '~/assets/modalState'

export function showModal(
    data,
    callback,
    models = null,
    additionalParams = ['created_at', 'deleted_at'],
    headerInfos = null,
) {
    // new models object

    if (!data?.models) data.models = {}
    let mappedModels = {}
    for (const param of additionalParams)
        Object.assign(mappedModels, models?.[param] && { [param]: models[param] })

    // if existing record
    if (data.fields && models?.id) {
        mappedModels.id = models.id.toString()

        // loop for every fields in the modal form
        for (const [key, field] of Object.entries(data.fields)) {
            // database field name
            const fieldName = field.fieldName ?? key
            const multiple = field.attrs?.multiple
            let groupModel

            // model's other relationships
            const fieldGroup = field.fieldGroup ?? (typeof field.addMore === 'string' ? field.addMore : null)
            groupModel = getGroupModels(fieldGroup, models)

            // if iteration is for model's other relationship
            // prepare connection data
            if (fieldGroup && groupModel) {
                // initialize group object
                if (!mappedModels.groupIds) mappedModels.groupIds = {}

                if (Array.isArray(groupModel)) {
                    if (!multiple && !field.addMore) {
                        // if group model is array and no multiple or add more requirement, get first
                        groupModel = groupModel[0]
                    }
                    // insert to groupIds collection
                    else {
                        const getGroupIds = (values) =>
                            Array.isArray(values)
                                ? values.map((value) => getGroupIds(value))
                                : { id: values?.id }
                        mappedModels.groupIds[key] = getGroupIds(Object.values(groupModel))
                    }
                }
                // if not array, insert to groupIds collection
                if (groupModel?.id) mappedModels.groupIds[key] = { id: groupModel?.id }
            }

            // re-assign model to current iteration's parent model
            let model = groupModel ?? models

            // get current iteration's field data from model
            if (Array.isArray(model)) {
                const getNestedModel = (values) =>
                    values.map((value) =>
                        Array.isArray(value) ? getNestedModel(value) : value[fieldName] ?? value[key],
                    )
                model = getNestedModel(model)
            } else {
                model =
                    model[fieldName?.toLowerCase()] ??
                    model[key?.toLowerCase()] ??
                    model[singular(fieldName, false)] ??
                    model[singular(key, false)]
            }

            // if field is date, reformat mysql date to js
            if (field.attrs?.type === 'datetime-local') model = convertDateTime(model)

            // convert field to array if multiple
            if (!Array.isArray(model) && multiple) model = [model]

            // convert array to field if data is array and field is not multiple
            if (Array.isArray(model) && !multiple && !field.addMore) model = model[0]
            // set modal data count to # of add more fields
            else if (field.addMore && model?.length) {
                const getNestedCount = (values) =>
                    values.every((item) => Array.isArray(item))
                        ? values.map((value) => (value.length > 0 ? getNestedCount(value) : 1))
                        : values.length
                data.fields[key].count = getNestedCount(model)
            }

            // make sure id is a string to prevent missing data
            if (typeof model === 'object')
                if (Array.isArray(model) && model[0]?.id && typeof model[0]?.id !== 'string')
                    model = model.map((x) => ({ ...x, id: x.id.toString() }))
                else if (model?.id && typeof model?.id !== 'string') model.id = model.id.toString()

            // assign valid data to mappedModels
            if (!((typeof model === 'string' || Array.isArray(model)) && !model?.length)) {
                mappedModels[key] = model
            }
        }
    } else mappedModels = models

    // re-assign models to mappedModels
    data.models = Object.assign({}, mappedModels ?? {}, data.variables)
    if (headerInfos) {
        data[headerInfos] = Object.assign({}, headerInfos)
    }

    // set modal data and show modal
    setTimeout(() => {
        modal.data = data
        modal.data.dialog = true
        modal.serverModels = models
        modal.callback = callback
    }, 50)
}

function getGroupModels(fieldGroup, models) {
    let data = null

    if (fieldGroup) {
        for (const key of fieldGroup.split('.')) {
            if (Array.isArray(data)) {
                data = data.map((value) => value[key])
            } else {
                data = data ? data[key] : models[key]
            }
        }
    }

    return data
}
