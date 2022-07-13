import Vue from 'vue'
import { dateTimeNow } from '~/assets/js/utils'
export default function ({ cache, queries, variables, mutationResult, operation = 'ADD', switchVars }) {
    let success = true
    operation = operation.toUpperCase()
    if (!Array.isArray(queries)) queries = [queries]
    for (const query of queries) {
        try {
            let cacheData
            let cacheData2
            try {
                cacheData = cache.readQuery({
                    query,
                    variables,
                })
            } catch (e) {
                continue
            }

            const key = Object.keys(cacheData)[0]
            let data = Object.prototype.hasOwnProperty.call(cacheData[key], 'data')
                ? cacheData[key].data
                : cacheData[key]

            let data2 = null
            try {
                if (operation === 'MOVE' && switchVars) {
                    cacheData2 = cache.readQuery({
                        query,
                        variables: switchVars,
                    })

                    data2 = Object.prototype.hasOwnProperty.call(cacheData2[key], 'data')
                        ? cacheData2[key].data
                        : cacheData2[key]
                }
            } catch {}

            if (
                !data.length ||
                !mutationResult.__typename ||
                !mutationResult.id ||
                data?.[0]?.__typename !== mutationResult?.__typename
            ) {
                let foundKey
                const findKey = (data, find, found = '') => {
                    for (const [key, field] of Object.entries(data)) {
                        if (Array.isArray(field)) {
                            if (field.length)
                                if (field[0]?.__typename === find) {
                                    found += key
                                    break
                                } else
                                    findKey(field?.[0], find, (found.length ? found + '.' : '') + key + '.0.')
                        }
                    }

                    return found?.slice(0, -1) === '.' || null ? null : found
                }

                if (data.length) {
                    if (data?.[0]?.__typename !== mutationResult?.__typename) {
                        foundKey = findKey(data[0], mutationResult?.__typename)
                        if (foundKey) data = data[0][foundKey]
                    }
                }

                if (!mutationResult.id) {
                    console.error('Return ID in your mutation result')
                    Vue.prototype.$eventBus.$emit('refresh')
                    continue
                }
            }

            let removedData = null
            for (let i = 0; i < 2; i++) {
                switch (operation) {
                    case 'MOVE':
                    case 'REMOVE':
                        removedData = data.splice(
                            data.findIndex((row) => row.id === mutationResult.id),
                            1,
                        )[0]
                        removedData.deleted_at = dateTimeNow()
                        if (cacheData) cacheData[key].paginatorInfo.total--
                        break
                    default: {
                        // ADD or ignore if UPSERT
                        const existing = data?.length
                            ? data.findIndex((row) => row.id === mutationResult.id)
                            : -1

                        if (existing === -1) {
                            data?.push(removedData ?? mutationResult)
                            if (cacheData && cacheData?.[key]?.paginatorInfo)
                                cacheData[key].paginatorInfo.total++
                        } else if (mutationResult.uploads) {
                            // Update uploads
                            data[existing].uploads = [
                                ...(data[existing].uploads ?? []),
                                ...mutationResult.uploads,
                            ]
                        }
                        break
                    }
                }

                if (cacheData) cache.writeQuery({ query, variables, data: cacheData })
                const skipMove = switchVars?.trashed ? !query.loc.source.body.includes('$trashed') : false
                if (operation === 'MOVE' && switchVars && !skipMove) {
                    data = data2
                    cacheData = cacheData2
                    variables = switchVars
                    operation = 'ADD'
                } else {
                    i++
                    if (operation === 'MOVE')
                        if (skipMove)
                            console.error('Add $trashed variable on the query of your Graphql.js file')
                        else if (data2) console.error('Add switchVars for cache move operation')
                }
            }
        } catch (e) {
            success = false
            console.error('Cache update error :', e)
        }
    }
    return success
}
