import { DefaultLayout } from '@/components/layout/DefaultLayout'
import { HeroSection } from '@/sections/HeroSection'
import { StatsSection } from '@/sections/StatsSection'
import { ProgramsSection } from '@/sections/ProgramsSection'
import { TransformationsSection } from '@/sections/TransformationsSection'
import { WhyPulseFitSection } from '@/sections/WhyPulseFitSection'
import { PulseSection } from '@/sections/PulseSection'
import { TrainersSection } from '@/sections/TrainersSection'
import { FacilitiesSection } from '@/sections/FacilitiesSection'
import { PricingSection } from '@/sections/PricingSection'
import { TestimonialsSection } from '@/sections/TestimonialsSection'
import { TickerSection } from '@/sections/TickerSection'
import { TrialCTASection } from '@/sections/TrialCTASection'
import { FAQSection } from '@/sections/FAQSection'
import { FinalCTASection } from '@/sections/FinalCTASection'

/**
 * Main Home Page component for a specific locale.
 * Assembles all landing page sections within the DefaultLayout.
 */
export default function Home() {
  return (
    <DefaultLayout>
      <HeroSection />
      <StatsSection />
      <ProgramsSection />
      <TransformationsSection />
      <WhyPulseFitSection />
      <PulseSection />
      <TrainersSection />
      <FacilitiesSection />
      <PricingSection />
      <TestimonialsSection />
      <TickerSection />
      <TrialCTASection />
      <FAQSection />
      <FinalCTASection />
    </DefaultLayout>
  )
}
