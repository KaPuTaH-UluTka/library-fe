import {
    registrationStageOneSchema, registrationStageThreeSchema, registrationStageTwoSchema,
} from '../validation/validation';

export const selectRegistrationSchema = (registrationStage: number) => {
    switch (registrationStage) {
        case 1:
            return registrationStageOneSchema
        case 2:
            return registrationStageTwoSchema
        case 3:
            return registrationStageThreeSchema
        default:
            return registrationStageOneSchema
    }
}
