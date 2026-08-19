import { Container } from '@/components/layout/Container';
import { PRODUCTS } from '@/data/products';
import { ProductIcon } from '@/components/svg/icons/ProductIcon';
import { DrawSVGSection } from '@/components/animations/DrawSVGSection';
import { CardGlow } from '@/components/ui/CardGlow';
import { HomeExitLink } from '@/components/layout/HomeExitLink';

export function ProductsSection() {
  return (
    <section className="bg-bg-dark min-h-screen flex flex-col justify-center py-16" id="products">
      <Container className="w-full">
        <div className="mb-8">
          <p className="text-text-muted text-xs font-medium uppercase tracking-widest mb-4">
            Product Portfolio
          </p>
          <h2 className="text-text-primary font-bold text-4xl lg:text-5xl leading-tight max-w-xl">
            What we make
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {PRODUCTS.map((product) => {
            const isShutter = product.slug === 'shutter';
            return (
              <HomeExitLink
                key={product.slug}
                href={`/products/${product.slug}`}
                sectionId="products"
                aria-label={product.name}
                className="group relative block aspect-[4/3] rounded overflow-hidden"
              >
                <CardGlow className="h-full w-full overflow-hidden rounded" borderRadius={10}>
                  <DrawSVGSection
                    selector=".abs-path"
                    duration={20}
                    className={
                      isShutter
                        ? 'absolute inset-0 flex items-center justify-center text-text-primary opacity-90 group-hover:opacity-100 transition-opacity duration-500 p-6 pb-12'
                        : 'absolute inset-0 flex items-center justify-center text-text-primary opacity-90 group-hover:opacity-100 transition-opacity duration-500 p-6'
                    }
                  >
                    <ProductIcon
                      slug={product.slug}
                      variant="stroke"
                      strokeWidth={7}
                      className={isShutter ? 'w-[80%] h-[80%]' : 'w-full h-full'}
                    />
                  </DrawSVGSection>

                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg-dark/95 via-bg-dark/60 to-transparent p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-text-muted text-xs uppercase tracking-widest mb-1">
                      {product.brandLine}
                    </p>
                    <h3 className="text-text-primary font-semibold text-sm leading-tight">
                      {product.name}
                    </h3>
                    <p className="text-text-muted text-xs leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                      {product.tagline}
                    </p>
                  </div>
                </CardGlow>
              </HomeExitLink>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <HomeExitLink
            href="/products"
            sectionId="products"
            className="inline-flex items-center gap-3 border border-border-subtle bg-bg-card/60 text-text-muted px-10 py-4 text-sm font-semibold uppercase tracking-widest backdrop-blur-md hover:text-text-primary hover:border-text-primary hover:bg-bg-card transition-colors duration-300"
          >
            View All Products
          </HomeExitLink>
        </div>
      </Container>
    </section>
  );
}
