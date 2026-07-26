import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/adminAuth";
import { connectToDatabase } from "@/lib/mongodb";
import { Order } from "@/lib/models/Order";
import { Contact } from "@/lib/models/Contact";
import { Subscriber } from "@/lib/models/Subscriber";
import { Product } from "@/lib/models/Product";
import { products as defaultProducts } from "@/lib/data";

export async function POST() {
  const session = await getAdminSession();
  if (!session.isAdmin) {
    return NextResponse.json({ success: false, error: session.error || "Unauthorized access." }, { status: 403 });
  }

  try {
    await connectToDatabase();

    // 1. Ensure Products are seeded
    let products = await Product.find();
    if (products.length === 0) {
      const seededProds = defaultProducts.map((p) => ({
        productId: p.id,
        name: p.name,
        tagline: p.tagline,
        price: p.price,
        image: p.image,
        images: p.images || [p.image],
        gallery: p.gallery || [],
        category: p.category,
        theme: p.theme,
        ingredients: p.ingredients,
        description: p.description,
        stock: 45,
        isFeatured: true,
        isActive: true,
      }));
      await Product.insertMany(seededProds);
      products = await Product.find();
    }

    // 2. Generate Sample Orders if count < 5
    const existingOrdersCount = await Order.countDocuments();
    let seededOrdersCount = 0;

    if (existingOrdersCount < 5) {
      const sampleOrders = [
        {
          orderId: "TRA-890124",
          customer: {
            fullName: "Alexander Wright",
            email: "alexander.wright@luxury.co",
            phone: "+1 (555) 234-5678",
            address: "742 Evergreen Terrace",
            city: "London",
            postalCode: "SW1A 1AA",
            country: "United Kingdom",
          },
          items: [
            { productId: "terra-face-wash", title: "TERRA Purifying Face Wash", price: 899, quantity: 2 },
            { productId: "terra-beard-oil", title: "TERRA Signature Beard Oil", price: 999, quantity: 1 },
          ],
          totalAmount: 2797,
          paymentMethod: "Prepaid Card",
          status: "delivered",
          createdAt: new Date(Date.now() - 86400000 * 3),
        },
        {
          orderId: "TRA-912048",
          customer: {
            fullName: "Marcus Sterling",
            email: "marcus@sterlingcapital.com",
            phone: "+91 98765 43210",
            address: "45 Marine Drive, Suite 12",
            city: "Mumbai",
            postalCode: "400020",
            country: "India",
          },
          items: [
            { productId: "terra-beard-oil", title: "TERRA Signature Beard Oil", price: 999, quantity: 2 },
          ],
          totalAmount: 1998,
          paymentMethod: "UPI / NetBanking",
          status: "shipped",
          createdAt: new Date(Date.now() - 86400000 * 1),
        },
        {
          orderId: "TRA-773910",
          customer: {
            fullName: "Julian Vance",
            email: "julian.vance@studio.design",
            phone: "+44 7700 900077",
            address: "12 Mayfair Gardens",
            city: "Edinburgh",
            postalCode: "EH1 2NG",
            country: "United Kingdom",
          },
          items: [
            { productId: "terra-face-wash", title: "TERRA Purifying Face Wash", price: 899, quantity: 1 },
          ],
          totalAmount: 899,
          paymentMethod: "COD",
          status: "paid",
          createdAt: new Date(Date.now() - 3600000 * 5),
        },
        {
          orderId: "TRA-445821",
          customer: {
            fullName: "Devon Thorne",
            email: "devon.thorne@elemental.io",
            phone: "+1 (415) 889-0123",
            address: "300 Montgomery St",
            city: "San Francisco",
            postalCode: "94104",
            country: "United States",
          },
          items: [
            { productId: "terra-face-wash", title: "TERRA Purifying Face Wash", price: 899, quantity: 3 },
            { productId: "terra-beard-oil", title: "TERRA Signature Beard Oil", price: 999, quantity: 2 },
          ],
          totalAmount: 4695,
          paymentMethod: "Credit Card",
          status: "pending",
          createdAt: new Date(),
        },
      ];

      await Order.insertMany(sampleOrders);
      seededOrdersCount = sampleOrders.length;
    }

    // 3. Generate Sample Contact Messages
    const existingContactsCount = await Contact.countDocuments();
    let seededContactsCount = 0;

    if (existingContactsCount < 3) {
      const sampleContacts = [
        {
          name: "Lord Harrison Vance",
          email: "harrison@vanceestates.com",
          subject: "Corporate Bulk Order Inquiry for Executive Club",
          message: "Greetings, I am looking to procure 250 units of your Signature Beard Oil and Purifying Face Wash for our end-of-year executive hampers. Please reach out regarding bespoke packaging.",
          status: "new",
          createdAt: new Date(Date.now() - 3600000 * 2),
        },
        {
          name: "Sophia Rossi",
          email: "s.rossi@boutique-retail.it",
          subject: "Boutique Wholesale Stockist Request - Milan",
          message: "We operate a high-end men's apothecary in Milan. We would love to feature the TERRA brand in our physical showroom.",
          status: "read",
          createdAt: new Date(Date.now() - 86400000 * 2),
        },
      ];

      await Contact.insertMany(sampleContacts);
      seededContactsCount = sampleContacts.length;
    }

    // 4. Generate Sample Newsletter Subscribers
    const existingSubscribersCount = await Subscriber.countDocuments();
    let seededSubscribersCount = 0;

    if (existingSubscribersCount < 4) {
      const sampleSubscribers = [
        { email: "nikhil18981@gmail.com", isActive: true },
        { email: "victor@apexman.com", isActive: true },
        { email: "oliver.bennett@gentleman.org", isActive: true },
        { email: "contact@architectural-grooming.com", isActive: true },
      ];

      for (const sub of sampleSubscribers) {
        await Subscriber.updateOne(
          { email: sub.email },
          { $setOnInsert: sub },
          { upsert: true }
        );
      }
      seededSubscribersCount = sampleSubscribers.length;
    }

    return NextResponse.json({
      success: true,
      message: `Demo data populated successfully! (${seededOrdersCount} orders, ${seededContactsCount} inquiries, ${seededSubscribersCount} subscribers)`,
    });
  } catch (error) {
    console.error("Error in admin seed route:", error);
    return NextResponse.json({ success: false, error: "Failed to seed demo data." }, { status: 500 });
  }
}
