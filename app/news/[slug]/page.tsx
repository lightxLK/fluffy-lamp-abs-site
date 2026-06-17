interface Props {
  params: Promise<{ slug: string }>;
}

export default async function NewsSlugPage({ params }: Props) {
  const { slug } = await params;
  return <main className="min-h-screen" data-slug={slug} />;
}
