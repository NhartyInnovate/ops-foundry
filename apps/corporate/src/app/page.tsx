import { Container, Button, Badge } from '@opsfoundry/ui';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function CorporateHomePage() {
  return (
    <main className="min-h-screen bg-foundry-canvas text-foundry-dark">
      {/* Navigation placeholder */}
      <header className="border-b border-gray-200/80 bg-foundry-pure/80 backdrop-blur sticky top-0 z-50">
        <Container className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-display font-bold text-xl tracking-tight text-foundry-dark">
              OPS<span className="text-foundry-orange">FOUNDRY</span>
            </span>
            <Badge variant="corporate">Corporate</Badge>
          </div>
          <nav className="flex items-center gap-4">
            <Button variant="secondary" size="sm">
              Academy
            </Button>
            <Button variant="primary" size="sm">
              Contact Us
            </Button>
          </nav>
        </Container>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-28">
        <Container className="max-w-4xl text-center">
          <div className="flex justify-center mb-6">
            <Badge variant="brand">Managed Operational Infrastructure</Badge>
          </div>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight text-foundry-dark mb-6">
            Managed Operational Teams &amp; Digital Infrastructure
          </h1>
          <p className="font-body text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Ops Foundry bridges strategic vision and day-to-day execution through managed teams, structured workflows, and AI-enabled tooling.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button variant="primary" size="lg">
              Book a Consultation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="secondary" size="lg">
              Explore Services
            </Button>
          </div>
        </Container>
      </section>

      {/* Foundation Verification Grid */}
      <section className="py-16 bg-foundry-pure border-t border-gray-100">
        <Container>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-foundry-canvas border border-gray-200/70">
              <CheckCircle2 className="h-6 w-6 text-foundry-orange mb-4" />
              <h3 className="font-display font-bold text-lg mb-2">Monorepo Foundation</h3>
              <p className="font-body text-sm text-gray-600">
                Shared tokens, types, and UI packages powered by Turborepo and Next.js 16.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-foundry-canvas border border-gray-200/70">
              <CheckCircle2 className="h-6 w-6 text-foundry-orange mb-4" />
              <h3 className="font-display font-bold text-lg mb-2">Design Tokens &amp; Tailwind 4</h3>
              <p className="font-body text-sm text-gray-600">
                Direction C token foundation with corporate dark (#111215) and warm canvas (#FBFBF9).
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-foundry-canvas border border-gray-200/70">
              <CheckCircle2 className="h-6 w-6 text-foundry-orange mb-4" />
              <h3 className="font-display font-bold text-lg mb-2">Reliable Architecture</h3>
              <p className="font-body text-sm text-gray-600">
                Strict type safety, headless MDX content readiness, and transactional outbox database package.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
