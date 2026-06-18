import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { PRODUCTS } from '@/data/products';
import { ShutterProfileScene } from '@/components/svg/scenes/ShutterProfileScene';
import { CoilUnrollScene } from '@/components/svg/scenes/CoilUnrollScene';

type SceneComponent = React.ComponentType<{ className?: string }>;

const SCENE_MAP: Record<string, SceneComponent> = {
  shutter: ShutterProfileScene,
  coils: CoilUnrollScene,
};

export function ProductsSection() {
  return (
    <section className="bg-bg-dark py-24" id="products">
      <Container>
        <div className="mb-14">
          <p className="text-abs-blue text-xs font-medium uppercase tracking-widest mb-4">
            Our Range
          </p>
          <h2 className="text-text-primary font-bold text-4xl lg:text-5xl leading-tight max-w-xl">
            What we make
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {PRODUCTS.map((product) => {
            const Scene = SCENE_MAP[product.slug];
            return (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                aria-label={product.name}
                className="group relative bg-bg-card border border-border-subtle overflow-hidden block aspect-[4/5]"
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-15 group-hover:opacity-35 transition-opacity duration-500 p-8">
                  {Scene ? (
                    <Scene className="w-full h-full" />
                  ) : (
                    <div className="w-12 h-12 border border-border-subtle" aria-hidden="true" />
                  )}
                </div>

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg-dark/95 via-bg-dark/60 to-transparent p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-text-muted text-xs uppercase tracking-widest mb-2">
                    {product.category}
                  </p>
                  <h3 className="text-text-primary font-semibold text-base leading-tight mb-2">
                    {product.name}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    {product.tagline}
                  </p>
                </div>

                <div className="absolute top-4 right-4 w-7 h-7 border border-border-subtle flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-text-muted text-xs" aria-hidden="true">
                    →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-3 border border-border-subtle text-text-muted px-10 py-4 text-sm font-semibold uppercase tracking-widest hover:text-white hover:border-white transition-colors duration-300"
          >
            View All Products
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
