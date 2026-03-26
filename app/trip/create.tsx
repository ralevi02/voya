import { View, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCreateTrip } from '@/features/trips/hooks/use-create-trip';
import { WizardHeader } from '@/features/trips/components/wizard-header';
import { StepDestination } from '@/features/trips/components/step-destination';
import { StepDates } from '@/features/trips/components/step-dates';
import { StepDetails } from '@/features/trips/components/step-details';

export default function CreateTripScreen() {
  const wizard = useCreateTrip();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View className="flex-1 px-6 pt-2">
          <WizardHeader
            step={wizard.step}
            totalSteps={wizard.totalSteps}
            onBack={wizard.prevStep}
          />

          {wizard.step === 0 && (
            <StepDestination
              formData={wizard.formData}
              onUpdate={wizard.updateFormData}
              onNext={wizard.nextStep}
              onBack={wizard.prevStep}
            />
          )}

          {wizard.step === 1 && (
            <StepDates
              formData={wizard.formData}
              onUpdate={wizard.updateFormData}
              onNext={wizard.nextStep}
              onBack={wizard.prevStep}
            />
          )}

          {wizard.step === 2 && (
            <StepDetails
              formData={wizard.formData}
              formError={wizard.formError}
              isSubmitting={wizard.isSubmitting}
              onUpdate={wizard.updateFormData}
              onSubmit={wizard.submit}
              onBack={wizard.prevStep}
            />
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
