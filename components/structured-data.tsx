// ✅ SEO structured data
interface AirdropStructuredDataProps {
  airdrop: {
    id: string
    name: string
    description: string
    logo: string
    rating: number
    totalRatings: number
  }
}

export function AirdropStructuredData({ airdrop }: AirdropStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: airdrop.name,
    description: airdrop.description,
    image: airdrop.logo,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: airdrop.rating,
      reviewCount: airdrop.totalRatings,
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
}
