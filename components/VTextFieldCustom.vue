<template>
    <div>
        <v-text-field
            :value="value"
            :label="label"
            :hint="legend"
            :error-messages="validated ? errors : []"
            @keyup="onChange"
            @keyup.enter="onEnter"
        />
        validated: {{ validated }}
    </div>
    <!-- https://vuetifyjs.com/en/components/text-fields/#props -->
    <!-- https://vuetifyjs.com/en/components/inputs/#error-count -->
</template>

<script>
import {
    ref
} from '@nuxtjs/composition-api'

import * as yup from 'yup'

export default {
    props: {
        value: {
            type: [String, Number],
            required: true,
        },
        label: {
            type: [String],
            default: '',
        },
        name: {
            type: [String],
            required: true,
        },
        legend: {
            type: [String],
            default: '',
        },
        rules: {
            type: [Object],
            default: () => ({}),
        },
        validated: {
            type: [Boolean],
            default: false,
        },
    },
    setup (props, { emit, }) {
        console.log('LoginComponent setup')

        const { name, label, legend, rules, validated, } = props
        console.log('name: ', name)
        console.log('label: ', label)
        console.log('legend: ', legend)
        console.log('validated: ', validated)

        const { email, required, minlength, maxlength, } = rules
        console.log('minlength: ', minlength)
        console.log('maxlength: ', maxlength)
        console.log('required: ', required)
        console.log('email: ', email)

        const errors = ref([])

        let schema = yup.string()
        if (minlength) {
            schema = schema.min(minlength)
        }
        if (maxlength) {
            schema = schema.max(maxlength)
        }
        if (required) {
            schema = schema.required()
        }
        if (email) {
            schema = schema.email()
        }

        const schemaObject = yup.object().shape({
            [name]: schema,
        })

        const dialog = ref(false)

        const onChange = async (e) => {
            const value = e?.target?.value ? e?.target?.value : e?.value
            console.log('onChange: ', value)
            if (value) {
                try {
                    await schemaObject.validate({
                        [name]: value,
                    }, { abortEarly: false, })
                    errors.value = []
                    emit('errors', [])
                } catch (err) {
                    const { inner, } = err
                    if (inner) {
                        errors.value = []
                        for (const e of inner) {
                            const { message, } = e
                            errors.value.push(message)
                        }
                    }
                    emit('errors', errors.value)
                }
                emit('input', value)
            }
        }

        const onEnter = (e) => {
            const value = e?.target?.value
            if (value) {
                emit('enter', value)
            }
        }

        return {
            dialog,
            onChange,
            onEnter,
            errors,
        }
    },
}
</script>
