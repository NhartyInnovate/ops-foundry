import { Container, Button, Badge } from '@opsfoundry/ui';
import { ArrowRight, GraduationCap, BookOpen, Sparkles } from 'lucide-react';

export default function AcademyHomePage() {
  return (
    <main className="min-h-screen bg-foundry-canvas text-foundry-slate">
      {/* Navigation placeholder */}
      <header className="border-b border-gray-200/80 bg-foundry-pure/80 backdrop-blur sticky top-0 z-50">
        <Container className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-display font-bold text-xl tracking-tight text-foundry-slate">
              OPS<span className="text-foundry-orange">FOUNDRY</span>
            </span>
            <Badge variant="academy">Academy</Badge>
          </div>
          <nav className="flex items-center gap-4">
            <Button variant="secondary" size="sm">
              Corporate
            </Button>
            <Button variant="primary" size="sm">
              Apply Now
            </Button>
          </nav>
        </Container>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-28">
        <Container className="max-w-4xl text-center">
          <div className="flex justify-center mb-6">
            <Badge variant="brand">Professional Operational Academy</Badge>
          </div>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight text-foundry-slate mb-6">
            Practical Skills for Modern Operational Leaders
          </h1>
          <p className="font-body text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Gain mastery in structured workflows, AI-assisted operations, and team execution through rigorous hands-on training programmes.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button variant="primary" size="lg">
              Explore Programmes
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="secondary" size="lg">
              Admissions Guide
            </Button>
          </div>
        </Container>
      </section>

      {/* Academy Foundation Verification Grid */}
      <section className="py-16 bg-foundry-pure border-t border-gray-100">
        <Container>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-foundry-canvas border border-gray-200/70">
              <GraduationCap className="h-6 w-6 text-foundry-orange mb-4" />
              <h3 className="font-display font-bold text-lg mb-2">Curriculum Architecture</h3>
              <p className="font-body text-sm text-gray-600">
                Type-safe programme definitions and structured admissions data models in `@opsfoundry/types`.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-foundry-canvas border border-gray-200/70">
              <Sparkles className="h-6 w-6 text-foundry-orange mb-4" />
              <h3 className="font-display font-bold text-lg mb-2">Aspirational &amp; Credible</h3>
              <p className="font-body text-sm text-gray-600">
                Academy slate (#1E232E) personality with high-contrast, accessible typography and tokens.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-foundry-canvas border border-gray-200/70">
              <BookOpen className="h-6 w-6 text-foundry-orange mb-4" />
              <h3 className="font-display font-bold text-lg mb-2">Independent Deployment</h3>
              <p className="font-body text-sm text-gray-600">
                Deploys to academy.opsfoundry.com independently while sharing UI components and design tokens.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
