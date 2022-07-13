<template>
    <v-dialog
        v-model="dialog"
        :fullscreen="data.fullscreen"
        :max-width="data.maxWidth ? data.maxWidth : 600"
        persistent
    >
        <v-card>
            <v-stepper v-model="step">
                <v-stepper-header v-show="Object.keys(stepper).length > 1">
                    <div v-for="(value, name, index) in stepper" :key="'modalHeader' + index" v-frag>
                        <v-stepper-step
                            :color="companyInfo.theme.color"
                            :complete="step > index + 1"
                            :step="index + 1"
                        >
                            {{ value.title ?? name }}
                        </v-stepper-step>
                        <v-divider />
                    </div>
                </v-stepper-header>
                <v-stepper-items>
                    <template v-for="(value, name, index) in stepper">
                        <v-stepper-content :key="'modalContent' + index" :step="index + 1">
                            <v-card>
                                <v-card-title>
                                    <span class="headline">
                                        {{ value.title ?? data.title }}
                                    </span>
                                    <v-spacer />
                                    <Transition name="bounce">
                                        <v-btn v-if="topCloser" color="red" dark icon small @click="cancel">
                                            <Icon size="24" color="#D33" name="CloseBoxOutline" />
                                        </v-btn>
                                    </Transition>
                                </v-card-title>

                                <v-card-subtitle>
                                    {{ value.subtitle ?? data.subtitle }}
                                </v-card-subtitle>
                                <v-divider class="mb-1" />

                                <v-card-text v-show="!!message" class="mt-2">
                                    <v-row>
                                        <v-col>{{ message }}</v-col>
                                    </v-row>
                                </v-card-text>

                                <v-card-text v-if="!!$slots?.default" class="text-center">
                                    <slot />
                                </v-card-text>

                                <template
                                    v-if="
                                        name.toLowerCase() !== 'uploader' &&
                                        name.toLowerCase() !== 'confirmation'
                                    "
                                >
                                    <v-card-text v-if="data.headerInfo">
                                        <v-alert
                                            :color="data.headerInfo.color || companyInfo.theme.color"
                                            :type="data.headerInfo.type"
                                            border="bottom"
                                            colored-border
                                            elevation="2"
                                        >
                                            <div class="text-lg font-bold">{{ data.headerInfo.title }}</div>
                                            <div
                                                v-for="(text, i) in data.headerInfo.data"
                                                :key="i"
                                                class="text-base"
                                            >
                                                {{ text }}
                                            </div>
                                        </v-alert>
                                    </v-card-text>

                                    <LazyTableForm
                                        v-if="!!value.fields"
                                        ref="modalForm"
                                        :data="value"
                                        :data-models="data"
                                    />

                                    <div v-if="!!value.tabs" v-frag>
                                        <v-tabs
                                            v-show="Object.keys(value.tabs)?.length > 1"
                                            v-model="tab[step]"
                                            :color="companyInfo.theme.color"
                                            grow
                                        >
                                            <template v-for="(tabValue, tabName) in value.tabs">
                                                <v-tab
                                                    v-if="Object.keys(tabValue?.fields)?.length"
                                                    :key="tabName"
                                                >
                                                    {{
                                                        tabValue?.title ?? tabName.replace(/([A-Z])/g, ' $1')
                                                    }}
                                                </v-tab>
                                            </template>
                                        </v-tabs>

                                        <v-tabs-items v-model="tab[step]" class="mt-3">
                                            <v-tab-item
                                                v-for="(tabValue, tabName, t) in value.tabs"
                                                :key="tabName"
                                            >
                                                <LazyTableForm
                                                    v-if="!!tabValue.fields"
                                                    :ref="`modalTabForm${index + 1}-${t}`"
                                                    :data="tabValue"
                                                    :data-models="data"
                                                />
                                            </v-tab-item>
                                        </v-tabs-items>
                                    </div>
                                </template>
                                <LazyDropZone
                                    v-if="name.toLowerCase() === 'uploader' && value"
                                    :id="upload.id"
                                    ref="modalUploader"
                                    :model="upload.model"
                                    :tag="upload.tag"
                                    :user-id="upload.userId"
                                    @done="
                                        upload.files = $event
                                        uploading = false
                                    "
                                />
                                <LazyTableConfirmation
                                    v-if="name.toLowerCase() === 'confirmation' && value"
                                    :data="data"
                                />
                                <div v-if="index === 0 && data.table && data.table.headers">
                                    <TableSimple :data="data.table" />
                                </div>
                            </v-card>
                        </v-stepper-content>
                    </template>
                </v-stepper-items>

                <ModalActions
                    :data="data"
                    :step="step"
                    :total-steps="Object.keys(stepper).length"
                    :loading="loading"
                    :uploading="uploading"
                    :validate-forms="validateForms"
                    @cancel="cancel"
                    @back="step--"
                    @next="next"
                    @confirm="confirm"
                />
            </v-stepper>
        </v-card>
    </v-dialog>
</template>

<script>
import { convertDateTime, dateTimeNow, isFunction, singular, isObject } from '~/assets/js/utils'

export default {
    name: 'Modal',
    props: {
        /**
         * Prop to define all modal parameters, conditions, or values of elements
         *
         * @type {object} data
         * @example
         {
            data: {
                fullscreen: false,
                maxWidth: 600,
                title: string,         // Default modal title
                subtitle: string,      // Default modal subtitle
                message: string,       // Modal message
                uploader: true,        // Use file uploader
                confirmation: true,    // Use confirmation page

                // Parameters for a form
                // If defined with a stepper, this will be considered step 1
                // Refer to DataInput.vue and Input.vue for more info
                fields: {
                    // If no method declared, creates an Input.vue component
                    name: {
                        type: 'textField',
                        required: true,
                        attrs: {
                            label: 'Name',
                            type: 'text',
                        },
                    },
                    // If method exist, creates a DataInput.vue component
                    Category: {             // Refer to DataInput.vue for more options
                        type: 'comboBox',
                        cols: 4,            // Grid layout of input in Form.vue
                        connection: 'connect',
                        method: 'categoryFilter',
                        fieldName: 'categories',
                        variables: { scope: 'Product' },
                        attrs: {
                            label: 'Category*',
                            'item-text': 'name',
                        },
                    },
                    for_freebies: {
                        type: 'select',
                        attrs: {
                            label: 'For Freebies?',
                            // Creates a custom selection
                            items: [
                                { text: 'Yes', value: 1 },
                                { text: 'No', value: null },
                            ],
                        },
                    },
                },
                // Creates modal stepper
                stepper:{
                    Step1:{     // Step 1 if fields is not defined; else, Step 2
                        title: 'Fill-up',   // If not defined, key will be used
                        fields: {...}       // Same as above
                    },
                    Step2:{
                        ...
                    }
                },
                // Creates modal tabs
                tabs: {
                    SelectExistingUser: {   // Tab name
                        title: 'Existing User', // If not defined, key will be used
                        fields: {
                            id: {
                                type: 'textField',
                                attrs: {
                                    label: 'Id',
                                    type: 'text',
                                    disabled: true,
                                },
                                hideOn: 'create | update',   // Hide on create | update
                            },
                            userId: {
                                type: 'comboBox',
                                connection: 'none',
                                fieldName: 'id',
                                model: 'User',
                                method: 'users',
                                attrs: {
                                    label: 'Selected User',
                                    'item-text': 'name',
                                },
                                hideOn: 'update',
                            },
                            is_courier: {
                                type: 'select',
                                attrs: {
                                    label: 'Courier Type',
                                    items: [
                                        { text: 'Driver', value: 1 },
                                        { text: 'Helper', value: 2 },
                                    ],
                                },
                                hideOn: 'create',
                            },
                        },
                    },
                    AddNewUser: {
                        hideOn: 'update',
                        fields: {
                            first_name: {
                                type: 'textField',
                                required: true,
                                attrs: {
                                    label: 'Firstname',
                                },
                            },
                            middle_name: {
                                type: 'textField',
                                required: true,
                                attrs: {
                                    label: 'Middlename',
                                },
                            },
                            last_name: {
                                type: 'textField',
                                required: true,
                                attrs: {
                                    label: 'Lastname',
                                },
                            },
                        },
                    },
                },
                positiveBtn: string,       // Text of the submit button
                negativeBtn: string,       // Text of the cancel button

                // Render a Table
                table: {
                    items: {}, // Object or Array of Object items
                    headers: [] // Array of Object Headers
                },

                // Custom Buttons
                buttons: {
                    button1: () => {}, // Callback

                    button2: { // Button name and text
                        text: 'My Button 2', // Override button text (string or method)
                        show: true, // Toggle button visibility (boolean or method)
                        callback: () => {}
                    },

                    button3: ({ action }) => {
                        action.done() // Close the Modal
                        action.continue() // Stops loading and keeps the Modal open
                    },

                    // Button Menu
                    menu1: {
                        items: [ // Array of Strings or Objects
                            {
                                text: 'Item 1',
                                callback: () => {} // Overrides default callback
                            },
                            {
                                text: 'Item 2',
                                show: false // Toggle menu item visibility (boolean or method)
                            },
                            'Item 3'
                        ],
                        callback: () => {} // Menu item's default callback
                    }
                }
            }
         }
         */
        data: {
            type: Object,
            required: true,
        },
        serverModels: {
            type: Object,
            default: () => ({}),
        },

        /**
         * Loading status of Modal component
         *
         * @type {boolean}
         *
         */
        loading: {
            type: Boolean,
            default: false,
        },

        /**
         * Wait loading to finish before showing the Modal
         *
         * @type {boolean}
         *
         */
        waitBeforeOpen: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            step: 1,
            stepper: {},
            uploading: false,
            upload: {},
            tab: {},
            lastTab: {},
            waitOpen: {
                dialog: false,
                interval: null,
            },
            topCloser: false,
        }
    },
    computed: {
        dialog() {
            return this.waitBeforeOpen || this.data.waitBeforeOpen ? this.waitOpen.dialog : this.data?.dialog
        },
        message() {
            const message = this.data?.message
            return isFunction(message) ? message() : message
        },
    },
    watch: {
        data: {
            handler() {
                this.stepper = {}
                if (this.data.fields || this.data.stepper || this.data.tabs) {
                    this.stepper = Object.assign(
                        {},
                        this.data.fields || this.data.tabs
                            ? {
                                  Fill: {
                                      title: 'Fill-up',
                                      fields: this.data.fields,
                                      tabs: this.data.tabs,
                                  },
                              }
                            : {},
                        this.data.stepper,
                        this.data.uploader && { Uploader: !!this.data.uploader },
                        this.data.confirmation && { Confirmation: true },
                    )
                } else this.stepper.default = true
            },
            immediate: true,
            deep: true,
        },
        'data.dialog'() {
            this.waitOpen.interval = setInterval(() => {
                if (!this.loading) {
                    this.waitOpen.dialog = this.data.dialog
                    clearInterval(this.waitOpen.interval)
                }
            }, 50)
            const action = this.dialog ? 'onShow' : 'onHide'
            if (this.data?.[action]) this.data[action](this.data)
            if (this.dialog)
                setTimeout(() => {
                    this.topCloser =
                        document.getElementsByClassName('v-dialog--active')[0]?.clientHeight <
                        document.getElementsByClassName('v-dialog--active')[0]?.scrollHeight
                }, 500)
            else this.topCloser = false
        },
        tab: {
            handler() {
                if (this.data.tabs) {
                    const lastTabName = Object.keys(this.data.tabs)[this.lastTab[this.step]]
                    const lastTab = this.data.tabs[lastTabName]?.fields
                    const reset = (validationOnly = false) => {
                        if (!validationOnly)
                            for (const [key, { fieldName }] of Object.entries(lastTab ?? {}))
                                this.$set(this.data.models, fieldName ?? key, undefined)
                        for (const form of this.tabForm(this.lastTab)) form?.resetValidation()
                        this.lastTab = { ...this.tab }
                    }
                    let incomplete = false
                    for (const [key, { fieldName }] of Object.entries(lastTab ?? {}))
                        if (this.data.models[fieldName ?? key]) {
                            incomplete = true
                            break
                        }

                    if (this.tab[this.step] !== this.lastTab[this.step])
                        if (!this.validateForms(false, this.lastTab) && incomplete) {
                            this.$iziToast.question({
                                timeout: 2000,
                                close: false,
                                overlay: true,
                                title: `${lastTabName.replace(/([A-Z])/g, ' $1')} INCOMPLETE.`.toUpperCase(),
                                message: "Clear last tab's data?",
                                position: 'center',
                                displayMode: 'once',
                                buttons: [
                                    [
                                        '<button><b>YES</b></button>',
                                        (instance, toast) => {
                                            instance.hide({ transitionOut: 'fadeOut' }, toast, 'yes')
                                        },
                                        true,
                                    ],
                                    [
                                        '<button>NO</button>',
                                        (instance, toast) => {
                                            instance.hide({ transitionOut: 'fadeOut' }, toast, 'no')
                                            this.$nextTick(() => {
                                                this.tab[this.step] = this.lastTab[this.step]
                                            })
                                        },
                                        false,
                                    ],
                                ],
                                onClosing: (instance, toast, closedBy) => {
                                    if (['yes', 'timeout'].includes(closedBy)) reset()
                                },
                            })
                        } else reset(true)
                }
            },
            deep: true,
        },
    },
    methods: {
        tabForm(tab = this.tab) {
            const modalTabForm = `modalTabForm${this.step}-${tab[this.step]}`
            return this.$refs[modalTabForm] ?? []
        },
        uploadFiles() {
            this.$refs.uploader.uploadAllFiles()
        },
        validateForms(sanitize = true, tab = this.tab) {
            const forms = [...(this.$refs.modalForm ?? []), ...this.tabForm(tab)]
            if (forms.length) for (const form of forms) if (!form?.validate()) return false

            return sanitize
                ? {
                      models: this.sanitize(Object.assign({}, this.data.models), this.data),
                      uploader: this.startUploadingFiles,
                  }
                : true
        },
        resetFormValidations() {
            for (const [key, forms] of Object.entries(this.$refs))
                if (key.startsWith('modal') && key.search('Form') > 0)
                    for (const form of forms) form?.resetValidation()
        },
        next() {
            for (const dialog of document.getElementsByClassName('v-dialog--active'))
                dialog.scrollTo({
                    top: 0,
                    left: 0,
                })
            if (this.validateForms(false)) this.step++
            else
                this.$iziToast.warning({
                    title: 'WARNING'.toUpperCase(),
                    message: 'Please fill up all required fields.',
                    position: 'bottomLeft',
                })
        },
        async startUploadingFiles(id, model) {
            this.uploading = true
            this.upload = {
                id,
                model,
                tag: typeof this.data.uploader === 'string' ? this.data.uploader : '',
                userId: this.$auth.user?.id,
            }
            if (this.data.uploader && (await this.$refs.modalUploader[0].uploadAllFiles())) {
                let uploaderStep = Object.keys(this.stepper).length
                if (this.data.confirmation) uploaderStep--
                this.step = uploaderStep
            } else this.uploading = false

            return new Promise((resolve) => {
                this.upload.interval = setInterval(() => {
                    if (!this.uploading) {
                        clearInterval(this.upload.interval)
                        resolve(this.upload.files)
                        this.upload = {}
                    }
                }, 250)
            })
        },
        confirm() {
            const mappedModels = this.validateForms()

            if (mappedModels) {
                /**
                 * Event emitted after confirming
                 * @event confirm
                 * @property {object} data { models: sanitizedModels, uploader: uploaderCallback }
                 */
                this.$emit('confirm', mappedModels)
                const close = setInterval(() => {
                    if (!this.loading && !this.uploading) {
                        clearInterval(close)
                        if (this.data.fields)
                            for (const model of Object.keys(this.data.fields))
                                this.$set(this.data.models, model, undefined)
                        this.cancel()
                    }
                }, 50)
            }
        },
        cancel() {
            /**
             * Event emitted after closing the modal
             * @event cancel
             */
            this.$emit('cancel')
            if (Object.keys(this.data?.fields ?? {}).length)
                Object.values(this.data.fields).forEach((data) => this.$delete(data, 'count'))
            this.resetFormValidations()
            this.step = 1
            this.tab = {}
            this.lastTab = {}
        },
        sanitize(data, modalData) {
            if (modalData?.fields) {
                const input = {}
                const inputValues = {}
                const optimisticResponse = {}
                const fieldGroups = {}
                const excluded = []
                const type = modalData.model ?? ''

                const getIDs = (value) => {
                    if (Array.isArray(value)) {
                        if (typeof value?.[0] === 'object') value = value?.map((v) => v.id)
                    } else if (typeof value === 'object') value = value?.id
                    return value
                }
                const createConnectionObj = (value, connection, field, fieldName, id = null) => {
                    let create = null
                    const includes = {}
                    const customConnection = () =>
                        ['connectOrCreate', 'syncOrCreate'].includes(connection) || field.acceptUserInput
                    id = isNaN(id) ? null : id

                    if (this.data.returnObject && typeof value !== 'object') id = null

                    // If model is returned as object then get only ID's
                    value = getIDs(value)

                    if (field.includes)
                        for (const include of field.includes)
                            includes[include] = { connect: getIDs(input[include]) }

                    if (customConnection()) {
                        if (id) connection = connection.split('Or')[0]
                        else {
                            create = {
                                ...(value ? { [field.attrs['item-text']]: value, ...field.variables } : {}),
                                ...field.fieldVariables,
                                ...includes,
                            }
                            if (fieldName.slice(-1).toLowerCase() === 's') create = [create]
                        }
                    }

                    const graphqlConnection = [
                        'connect',
                        'sync',
                        'syncWithoutDetaching',
                        'disconnect',
                        'delete',
                    ].includes(connection)
                    return connection?.toLowerCase() === 'none'
                        ? value
                        : graphqlConnection && !create
                        ? { [connection]: value }
                        : customConnection()
                        ? { create }
                        : { [connection]: { [fieldName]: value }, ...field.fieldVariables, ...includes }
                }

                const isFieldChanged = (serverModels, data) => {
                    if (serverModels?.length) {
                        for (const [key, value] of Object.entries(data)) {
                            if (Array.isArray(serverModels))
                                serverModels = serverModels.filter((val) => {
                                    return val?.[key].id === value.connect
                                })[0]

                            if (typeof serverModels[key] !== 'object') {
                                if (serverModels[key] !== value) {
                                    return true
                                }
                            } else if (serverModels[key].id !== value.connect) {
                                return true
                            }
                        }
                        return false
                    } else {
                        return true
                    }
                }

                const createGroupFields = (fieldObject, field, fieldName, value, id = null) => {
                    const getField = (id, fieldValue, current) => {
                        return {
                            ...field.groupVariables,
                            ...(field.connectionGroup !== 'create' && id),
                            ...current,
                            [fieldName]: fieldValue,
                        }
                    }

                    const getKeyValue = () => {
                        let k
                        let v = value

                        if (isObject(v)) {
                            k = Object.keys(value)[0]
                            v = Object.values(value)[0]
                        }

                        return { k, v }
                    }

                    const mapValue = ({ v, k = null }) => {
                        if (Array.isArray(v)) {
                            fieldObject = v.map((v, index) => {
                                return getField(null, k ? { [k]: v } : v, fieldObject?.[index])
                            })
                        }
                    }

                    fieldObject = getField(id, value, fieldObject)

                    if (Array.isArray(id) && id.length) {
                        fieldObject = id.map((parentId, index) => {
                            const { k, v } = getKeyValue()

                            return getField(parentId, k ? { [k]: v[index] } : v[index], fieldObject?.[index])
                        })
                    }

                    mapValue({ v: value })

                    if (isObject(value)) {
                        mapValue(getKeyValue())
                    }

                    if (field.groupIncludes)
                        for (const include of field.groupIncludes) fieldObject[include] = input[include]
                    return fieldObject
                }

                const createOptimisticValue = (field, defaultType, value) =>
                    field?.attrs?.['item-text'] && value && field.connection?.toLowerCase() !== 'none'
                        ? { id: value, __typename: singular(field?.model ?? defaultType) }
                        : value

                const updateOptimisticObj = (optimisticObj, field, fieldName, value, type, id = null) => {
                    const optimisticVal = createOptimisticValue(field, fieldName, value)
                    optimisticObj = {
                        ...{ id },
                        ...Object.assign(optimisticObj ?? {}, {
                            [fieldName]: optimisticVal ?? null,
                            [singular(fieldName, false)]: optimisticVal ?? null,
                            updated_at: dateTimeNow(),
                            __typename: singular(type),
                        }),
                    }
                }

                for (let [key, value] of Object.entries(data)) {
                    if (key === 'created_at') optimisticResponse.created_at = value
                    if (key === 'deleted_at') optimisticResponse.deleted_at = value
                    if (
                        !(key in (modalData?.variables ?? {})) &&
                        !(key in modalData.fields) &&
                        !(key === 'id') &&
                        !(
                            key in
                            Object.values(modalData?.tabs ?? {})?.reduce((acc, v) => {
                                return { ...acc, ...v?.fields }
                            }, {})
                        )
                    )
                        continue

                    // todo: needs improvement on multiple tabs with same fieldNames
                    const field =
                        {
                            ...modalData.fields[key],
                            ...Object.values(modalData?.tabs ?? {})?.reduce((acc, v) => {
                                return { ...acc, ...v?.fields }
                            }, {})[key],
                        } ?? {}
                    const connection =
                        field.connection ?? (field.acceptUserInput ? 'connectOrCreate' : 'connect')

                    const isFloat =
                        /amount|price|qty|percent|total|bal|cost/.test(key.toLowerCase()) ||
                        field.attrs?.type === 'number'
                    const isDate =
                        /created_at|effective_at|date/.test(key.toLowerCase()) ||
                        field.attrs?.type === 'date' ||
                        field.attrs?.type === 'datetime-local'

                    if (isDate && value)
                        value = value.length < 11 ? value + ' 00:00:00' : convertDateTime(value, false)

                    if (isFloat && value) {
                        const toFloat = (v) =>
                            Array.isArray(v) ? v.map((item) => toFloat(item)) : parseFloat(v)
                        value = toFloat(value)
                    }

                    const groupIds = data.groupIds?.[key]
                    const fieldName = (field.fieldName ?? key).toLowerCase()

                    inputValues[fieldName] = value
                    // If returnObject is false, only values will be returned
                    if (!this.data.returnObject && !!value) inputValues[fieldName] = getIDs(value)

                    const fieldGroup = field.fieldGroup ?? field.addMore?.name ?? field.addMore ?? undefined
                    if (fieldGroup) {
                        // Skip creating connectionObj and OptimisticResponse here
                        const toDeleteGroupIds = data.toDeleteGroupIds?.[fieldGroup]
                        if (!fieldGroups[fieldGroup]) fieldGroups[fieldGroup] = {}
                        fieldGroups[fieldGroup][fieldName] = { value, field, groupIds, toDeleteGroupIds }
                        continue
                        // Process it in for (const [group, data] of Object.entries(fieldGroups)) loop
                    }
                    updateOptimisticObj(optimisticResponse, field, fieldName, value, type)

                    if (field.method || field.connection)
                        value = createConnectionObj(value, connection, field, fieldName, value?.id ?? value)

                    if (field.exclude) excluded.push(fieldName)
                    if (value || field.nullable) input[fieldName] = value
                }

                let fieldArray = []
                let fieldOptimistic = []
                for (const [group, data] of Object.entries(fieldGroups)) {
                    let groupConnection = 'connect'
                    for (const [fieldName, model] of Object.entries(data)) {
                        const connection = model.field.connection ?? 'connect'
                        if (model.field.connectionGroup) groupConnection = model.field.connectionGroup
                        if (Array.isArray(model.value)) {
                            for (let [index, value] of Object.entries(model.value)) {
                                if (!(value || model.field.nullable)) continue
                                updateOptimisticObj(fieldOptimistic[index], model.field, fieldName, value, group, model.groupIds?.[index]) // prettier-ignore

                                if (model.field.method || model.field.connection)
                                value = createConnectionObj(value, connection, model.field, fieldName, model.groupIds?.[index]) // prettier-ignore

                                fieldArray[index] = createGroupFields(fieldArray[index],model.field,fieldName,value,model.groupIds?.[index]) // prettier-ignore
                            }
                        } else if (model.value || model.field.nullable) {
                            fieldArray[0] = createGroupFields(fieldArray[0], model.field, fieldName, model.value, model.groupIds?.id) // prettier-ignore
                            updateOptimisticObj(fieldOptimistic[0], model.field, fieldName, model.value, group, model.groupIds?.id) // prettier-ignore
                        }
                    }
                    if (fieldArray.length) {
                        if (groupConnection === 'create' && Object.keys(this.serverModels ?? []).length) {
                            const groupName = Object.values(data)[0].field.fieldGroup ?? group
                            const groupArray = []
                            for (const field of fieldArray)
                                if (isFieldChanged(this.serverModels?.[groupName], field))
                                    groupArray.push(field)
                            input[group] = { [groupConnection]: groupArray }
                        } else input[group] = { [groupConnection]: fieldArray }
                        optimisticResponse[group] = fieldOptimistic
                    } else optimisticResponse[group] = null

                    if (Object.values(data)[0]?.toDeleteGroupIds) {
                        if (!input[group]) input[group] = {}
                        input[group].delete = Object.values(data)[0]?.toDeleteGroupIds
                    }

                    fieldArray = []
                    fieldOptimistic = []
                }

                for (const key of Object.keys(input)) {
                    if (key.includes('.')) {
                        const [parent, child] = key.split('.')
                        const parentConnection = Object.keys(input[parent])[0]
                        const childConnection = Object.keys(input[key])[0]

                        if (Array.isArray(input[parent][parentConnection])) {
                            input[parent][parentConnection] = input[parent][parentConnection].map(
                                (value, index) => {
                                    return {
                                        ...value,
                                        [child]: {
                                            [childConnection]: input[key][childConnection][index],
                                        },
                                    }
                                },
                            )
                        }

                        delete input[key]
                    }
                }

                excluded.forEach((e) => delete input[e])
                return {
                    input: { ...input },
                    inputValues,
                    optimisticResponse: { ...this.serverModels, ...optimisticResponse, __isOptimistic: true },
                }
            } else return data
        },
    },
}
</script>
