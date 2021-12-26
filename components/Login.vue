<template>
    <v-row justify="center">
        <v-dialog
            v-model="dialog"
            persistent
            max-width="50%"
        >
            <template #activator="{ on, attrs }">
                <v-btn
                    color="primary"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    @click.stop="toggleDialog"
                >
                    Open Dialog
                </v-btn>
            </template>
            <v-card>
                <v-card-title class="text-h5">
                    Use Google's location service?
                </v-card-title>

                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col
                                cols="12"
                                sm="12"
                                md="12"
                            >
                                <v-text-field-custom
                                    v-model="formValues.email.value"
                                    name="email"
                                    label="Email (*)"
                                    legend="Ex: example@domain.com"
                                    :validated="validated"
                                    :rules="formValues.email.rules"
                                    @errors="(e) => formValues.email.errors = e"
                                    @enter="submit"
                                />
                            </v-col>
                            <v-col
                                cols="12"
                                sm="12"
                                md="12"
                            >
                                <v-text-field
                                    label="Phone (*)"
                                    hint="Ex: +34 123 456 789"
                                />
                            </v-col>
                            <v-col
                                cols="12"
                                sm="12"
                                md="12"
                            >
                                <v-text-field
                                    label="Name (*)"
                                    hint="Ex: bypabloc"
                                />
                            </v-col>
                            <v-col
                                cols="12"
                                sm="12"
                                md="12"
                            >
                                <v-text-field
                                    label="Password (*)"
                                    hint="Ex: Example$%123"
                                />
                            </v-col>
                            <v-col
                                cols="12"
                                sm="12"
                                md="12"
                            >
                                <v-text-field
                                    label="Password confirmation (*)"
                                    hint="Must match password"
                                />
                            </v-col>
                        </v-row>
                    </v-container>
                    <small>(*) Indicates required field</small>
                </v-card-text>

                <v-card-actions>
                    <v-spacer />

                    <v-btn
                        color="green darken-1"
                        text
                        @click="toggleDialog"
                    >
                        Disagree
                    </v-btn>

                    <v-btn
                        color="green darken-1"
                        text
                        :disabled="!isValid && validated"
                        @click="submit"
                    >
                        Agree
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
import { ref, computed } from '@nuxtjs/composition-api'

export default {
    name: 'LoginComponent',
    setup () {
        const dialog = ref(false)

        const validated = ref(false)

        const formValues = ref({
            email: {
                value: '',
                errors: [],
                rules: {
                    maxlength: 50,
                    required: true,
                    email: true,
                },
            },
            phone: '',
            name: '',
            password: '',
            passwordConfirmation: '',
        })

        const isValid = computed(() => {
            for (const key in formValues.value) {
                if (formValues.value[key]?.errors?.length) {
                    console.log('formValues.value[key].errors', formValues.value[key]?.errors)
                    if (formValues.value[key].errors.length > 0) {
                        return false
                    }
                }
                // if (formValues.value[key].errors.length > 0) {
                //     console.log('isValid: ', false)
                //     return false
                // }
            }
            return true
        })

        const toggleDialog = () => {
            dialog.value = !dialog.value
        }

        const submit = () => {
            console.log('submit')
            validated.value = true
        }

        return {
            dialog,
            toggleDialog,
            formValues,
            validated,
            submit,
            isValid,
        }
    },
}
</script>
