(function () {
  const timeZone = "Asia/Jakarta";
  const now = new Date();

  const monthYear = new Intl.DateTimeFormat("id-ID", {
    timeZone,
    month: "long",
    year: "numeric",
  }).format(now);

  const monthParts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    month: "2-digit",
    year: "numeric",
  }).formatToParts(now);

  const monthMap = Object.fromEntries(
    monthParts
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, part.value])
  );

  const year = monthMap.year;
  const month = monthMap.month;
  const lastDay = new Date(Number(year), Number(month), 0).getDate();
  const startDate = `${year}-${month}-01`;
  const endDate = `${year}-${month}-${String(lastDay).padStart(2, "0")}`;

  const promoTitle = `Promo Hyundai ${monthYear} | Diskon & DP Ringan Hyundai BSD City`;
  const promoDescription = `Promo Hyundai ${monthYear} di Hyundai BSD City. Dapatkan diskon besar, cashback, DP ringan, cicilan fleksibel, dan bonus aksesoris untuk semua tipe Hyundai bulan ini.`;
  const promoKeywords = `Promo Hyundai ${monthYear}, Promo Hyundai BSD City, Diskon Hyundai ${year}, Harga Hyundai ${monthYear}, Promo Stargazer Creta Ioniq, Dealer Hyundai BSD`;
  const promoSlug = `promo-${month}-${year}`;
  const isPromoPage = Boolean(document.querySelector("[data-promo-title]"));

  const textNodes = [
    [document.querySelector("[data-promo-title]"), `Promo Hyundai ${monthYear} | Diskon & DP Ringan Hyundai BSD City`],
    [document.querySelector("[data-promo-heading]"), `Promo ${monthYear} Hyundai BSD City`],
    [document.querySelector("[data-promo-gallery]"), `Promo Spesial ${monthYear}`],
    [document.querySelector("[data-home-promo-heading]"), `Promo Spesial ${monthYear} Hyundai BSD City`],
  ];

  textNodes.forEach(([node, value]) => {
    if (node) node.textContent = value;
  });

  document.querySelectorAll("[data-promo-alt]").forEach((img, index) => {
    const unitNumber = String(index + 1).padStart(2, "0");
    img.alt = `Promo Hyundai ${monthYear} Unit ${unitNumber}`;
  });

  if (isPromoPage) {
    document.title = promoTitle;

    const metaUpdates = [
      ['meta[name="description"]', "content", promoDescription],
      ['meta[name="keywords"]', "content", promoKeywords],
      ['meta[property="og:title"]', "content", promoTitle],
      ['meta[property="og:description"]', "content", promoDescription],
      ['meta[name="twitter:title"]', "content", promoTitle],
      ['meta[name="twitter:description"]', "content", promoDescription],
    ];

    metaUpdates.forEach(([selector, attr, value]) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute(attr, value);
    });

    const jsonLd = document.getElementById("promo-jsonld");
    if (jsonLd) {
      jsonLd.textContent = JSON.stringify(
        {
          "@context": "https://schema.org",
          "@type": "Event",
          name: `Promo Hyundai ${monthYear} BSD City`,
          startDate,
          endDate,
          eventStatus: "https://schema.org/EventScheduled",
          eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
          location: {
            "@type": "Place",
            name: "Hyundai BSD City",
            address: {
              "@type": "PostalAddress",
              streetAddress: "BSD City",
              addressLocality: "Tangerang",
              addressRegion: "Banten",
              addressCountry: "ID",
            },
          },
          description: promoDescription,
          image: "https://hyundaibsd.city/thumbnail-og.jpg",
          organizer: {
            "@type": "Organization",
            name: "Hyundai BSD City",
            url: "https://hyundaibsd.city",
          },
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "IDR",
            availability: "https://schema.org/InStock",
            url: `https://hyundaibsd.city/promo#${promoSlug}`,
          },
          url: `https://hyundaibsd.city/promo#${promoSlug}`,
        },
        null,
        2
      );
    }
  }
})();
