import { db } from '@/lib/db';

async function main() {
  console.log('Seeding blog posts...');

  const blogs = [
    {
      title: 'The Complete Guide to Exporting from India in 2025',
      slug: 'complete-guide-exporting-from-india-2025',
      excerpt:
        'Navigate the complexities of international trade with our comprehensive guide to exporting from India. From documentation to compliance, we cover everything you need to know.',
      content: `
        <h2>Why India is a Global Export Powerhouse</h2>
        <p>India has emerged as one of the world's leading export destinations, with total merchandise exports reaching over $450 billion in recent years. From textiles and spices to pharmaceuticals and IT services, Indian businesses are making their mark on the global stage.</p>
        <p>At <strong>Unnat Vega</strong>, we've helped hundreds of businesses navigate the export landscape successfully. In this guide, we share our expertise to help you get started.</p>

        <h3>Essential Export Documentation</h3>
        <p>Before you can start exporting, you need to have the right documentation in place. Here's what you'll need:</p>
        <ul>
          <li><strong>IEC (Import Export Code)</strong> — Issued by DGFT, this is mandatory for any import/export activity</li>
          <li><strong>RCMC (Registration Cum Membership Certificate)</strong> — Required from relevant export promotion councils</li>
          <li><strong>Commercial Invoice</strong> — The primary document for customs clearance</li>
          <li><strong>Packing List</strong> — Detailed description of goods and packaging</li>
          <li><strong>Certificate of Origin</strong> — Verifies the country where goods were manufactured</li>
          <li><strong>Bill of Lading / Airway Bill</strong> — Contract between shipper and carrier</li>
        </ul>

        <h3>Understanding Export Compliance</h3>
        <p>Compliance is non-negotiable in international trade. Key areas to focus on include:</p>
        <ol>
          <li><strong>Customs Regulations</strong> — Stay updated on both Indian customs and destination country requirements</li>
          <li><strong>Quality Standards</strong> — Ensure products meet international quality certifications (ISO, CE, FDA, etc.)</li>
          <li><strong>Trade Agreements</strong> — Leverage FTAs (Free Trade Agreements) for preferential tariffs</li>
          <li><strong>Foreign Exchange Regulations</strong> — Comply with RBI guidelines for foreign exchange transactions</li>
        </ol>

        <h3>Building Your Digital Presence for Global Markets</h3>
        <p>In today's digital-first world, having a strong online presence is crucial for export success. A professional website, optimized for international audiences, can be your most powerful marketing tool. Here's what makes a great export business website:</p>
        <ul>
          <li>Multi-language support for target markets</li>
          <li>Clear product catalogs with detailed specifications</li>
          <li>Trust signals — certifications, testimonials, trade memberships</li>
          <li>SEO optimized for international search queries</li>
          <li>Fast loading times across global regions</li>
        </ul>

        <h3>Getting Started with Unnat Vega</h3>
        <p>Whether you're a first-time exporter or looking to scale your existing operations, Unnat Vega provides end-to-end support. From digital presence creation to compliance management, we're your partners in global trade success.</p>
        <p>Ready to take your business global? <a href="/contact">Contact us today</a> for a free consultation.</p>
      `,
      coverImage: '/images/blog-export-guide.jpg',
      author: 'Unnat Vega Team',
      tags: 'export,india trade,international business,compliance,digital presence',
      published: true,
    },
    {
      title: 'How Digital Transformation is Revolutionizing Import-Export Businesses',
      slug: 'digital-transformation-revolutionizing-import-export',
      excerpt:
        'Discover how technology and digital solutions are reshaping the import-export industry, from automated compliance to AI-powered trade analytics.',
      content: `
        <h2>The Digital Revolution in International Trade</h2>
        <p>The import-export industry is undergoing a massive transformation. What was once a paperwork-heavy, relationship-dependent business is now being revolutionized by digital technologies. From automated customs clearance to blockchain-powered supply chains, the future of trade is digital.</p>
        <p>At <strong>Unnat Vega</strong>, we're at the forefront of this transformation, helping businesses leverage technology to gain competitive advantages in global markets.</p>

        <h3>Key Technologies Driving Change</h3>

        <h4>1. AI-Powered Trade Analytics</h4>
        <p>Artificial Intelligence is transforming how businesses make trade decisions. AI algorithms can analyze market trends, predict demand patterns, and identify the most profitable trade routes and partnerships. Companies using AI analytics report up to 30% improvement in trade decision accuracy.</p>

        <h4>2. Blockchain for Supply Chain Transparency</h4>
        <p>Blockchain technology ensures end-to-end transparency in supply chains. From verifying the origin of goods to tracking shipments in real-time, blockchain builds trust between trading partners and reduces fraud.</p>

        <h4>3. Automated Compliance Systems</h4>
        <p>Compliance automation tools can instantly check your shipments against hundreds of regulations across different countries. This reduces errors, speeds up clearance times, and significantly lowers the risk of costly penalties.</p>

        <h4>4. Digital Payment Solutions</h4>
        <p>Cross-border payments have traditionally been slow and expensive. New fintech solutions are enabling faster, cheaper, and more transparent international transactions, with some platforms settling payments in minutes rather than days.</p>

        <h3>The Impact on Indian Businesses</h3>
        <p>Indian businesses that embrace digital transformation are seeing remarkable results:</p>
        <ul>
          <li><strong>40% reduction</strong> in customs clearance time through digital documentation</li>
          <li><strong>25% cost savings</strong> from automated compliance and reduced manual errors</li>
          <li><strong>3x increase</strong> in international inquiries through optimized digital presence</li>
          <li><strong>60% faster</strong> payment processing with modern fintech solutions</li>
        </ul>

        <h3>Building Your Digital Trade Infrastructure</h3>
        <p>A strong digital infrastructure is the foundation of modern import-export success. This includes:</p>
        <ol>
          <li><strong>Professional Website</strong> — Your digital storefront to the world</li>
          <li><strong>Trade Management Platform</strong> — Centralize operations, documentation, and compliance</li>
          <li><strong>Market Intelligence Tools</strong> — Data-driven insights for better decision making</li>
          <li><strong>Customer Communication Systems</strong> — Seamless multilingual communication with global clients</li>
        </ol>

        <h3>Unnat Vega's Digital-First Approach</h3>
        <p>We believe that every trade business deserves a powerful digital presence. Our team builds custom solutions that combine beautiful design with robust functionality, helping you attract international clients and streamline your operations.</p>
        <p>From e-commerce platforms to trade analytics dashboards, we create the digital tools that modern import-export businesses need to thrive. <a href="/contact">Let's discuss your digital transformation</a>.</p>
      `,
      coverImage: '/images/blog-digital-transformation.jpg',
      author: 'Unnat Vega Team',
      tags: 'digital transformation,import export,technology,AI,blockchain,trade analytics',
      published: true,
    },
    {
      title: 'Top 10 Import-Export Compliance Mistakes and How to Avoid Them',
      slug: 'top-import-export-compliance-mistakes',
      excerpt:
        'Learn about the most common compliance pitfalls in international trade and get practical tips to keep your import-export business on the right side of regulations.',
      content: `
        <h2>Compliance: The Make-or-Break Factor in International Trade</h2>
        <p>In the world of import-export, compliance isn't just about following rules — it's about protecting your business, your reputation, and your bottom line. A single compliance mistake can result in shipment delays, hefty fines, or even loss of trading privileges.</p>
        <p>After helping hundreds of businesses navigate international trade regulations, <strong>Unnat Vega</strong> has identified the most common compliance mistakes. Here's our definitive guide to avoiding them.</p>

        <h3>1. Incomplete or Incorrect Documentation</h3>
        <p>This is the number one compliance issue we see. Missing invoices, incorrect HS codes, and incomplete certificates of origin can delay shipments for weeks.</p>
        <p><strong>How to avoid it:</strong> Create a documentation checklist for each destination country. Use digital tools to auto-fill repetitive fields and validate data before submission.</p>

        <h3>2. Misclassifying Products Under Wrong HS Codes</h3>
        <p>Using the wrong Harmonized System (HS) code can lead to incorrect duty payments, shipment seizures, and legal issues.</p>
        <p><strong>How to avoid it:</strong> Consult the WTO HS database and cross-reference with destination country-specific codes. When in doubt, seek a binding ruling from customs authorities.</p>

        <h3>3. Ignoring Destination Country Regulations</h3>
        <p>Many exporters focus only on Indian regulations while overlooking import requirements of the destination country, leading to rejected shipments.</p>
        <p><strong>How to avoid it:</strong> Research destination-specific requirements before shipping. Consider working with local customs brokers who understand the regulatory landscape.</p>

        <h3>4. Non-Compliance with Foreign Exchange Regulations</h3>
        <p>RBI has strict guidelines for receiving foreign exchange from exports. Failure to repatriate export proceeds within the stipulated time can result in penalties.</p>
        <p><strong>How to avoid it:</strong> Track all foreign exchange receipts diligently. Set up automated reminders for repatriation deadlines (typically 9 months from the date of export).</p>

        <h3>5. Overlooking Free Trade Agreement Benefits</h3>
        <p>India has FTAs with numerous countries. Not leveraging these agreements means paying higher tariffs than necessary.</p>
        <p><strong>How to avoid it:</strong> Identify which FTAs apply to your products and destinations. Obtain the necessary certificates of origin to claim preferential tariff rates.</p>

        <h3>6. Inadequate Record Keeping</h3>
        <p>Customs authorities require businesses to maintain detailed records for several years. Poor record-keeping makes audits stressful and can result in penalties.</p>
        <p><strong>How to avoid it:</strong> Implement a digital document management system. Store all trade documents for at least 5 years with proper categorization and search capabilities.</p>

        <h3>7. Failing to Update IEC Details</h3>
        <p>Your Import Export Code must be updated whenever business details change. An outdated IEC can block your shipments.</p>
        <p><strong>How to avoid it:</strong> Review and update your IEC details annually or whenever there are changes in business address, directors, or bank details.</p>

        <h3>8. Not Conducting Due Diligence on Trade Partners</h3>
        <p>Trading with sanctioned entities or restricted parties can have severe legal consequences, including criminal prosecution.</p>
        <p><strong>How to avoid it:</strong> Screen all trade partners against sanctions lists (UN, EU, US OFAC). Implement a standard due diligence process for new partners.</p>

        <h3>9. Ignoring Packaging and Labeling Requirements</h3>
        <p>Different countries have specific packaging and labeling requirements. Non-compliance can result in refused entry at the destination port.</p>
        <p><strong>How to avoid it:</strong> Research packaging regulations for each market. Include required labels in the local language, and ensure packaging meets environmental regulations.</p>

        <h3>10. Not Having a Compliance Management System</h3>
        <p>Ad-hoc compliance management leads to gaps and oversights. Without a systematic approach, it's only a matter of time before something falls through the cracks.</p>
        <p><strong>How to avoid it:</strong> Invest in a compliance management system that centralizes regulations, tracks deadlines, and automates checks. This single step can eliminate the majority of compliance issues.</p>

        <h3>Building a Compliance-First Culture</h3>
        <p>Compliance shouldn't be an afterthought — it should be woven into every aspect of your trade operations. At Unnat Vega, we help businesses build compliance-first digital systems that make adherence automatic rather than effortful.</p>
        <p>From automated documentation to real-time regulatory monitoring, our solutions keep your business compliant while you focus on growth. <a href="/contact">Get in touch</a> to learn how we can help streamline your compliance processes.</p>
      `,
      coverImage: '/images/blog-compliance-mistakes.jpg',
      author: 'Unnat Vega Team',
      tags: 'compliance,import export,trade regulations,HS codes,documentation,FTAs',
      published: true,
    },
  ];

  for (const blog of blogs) {
    const existing = await db.blog.findUnique({ where: { slug: blog.slug } });
    if (existing) {
      console.log(`Blog "${blog.title}" already exists, skipping...`);
      continue;
    }

    await db.blog.create({ data: blog });
    console.log(`Created blog: "${blog.title}"`);
  }

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
