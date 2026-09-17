import Image from "next/image";
import { ArrowUpDown, Filter, Star, ThumbsUp } from "lucide-react";

// Static placeholder data — nothing here is fetched, per the brief.
const RATING_SUMMARY = {
  average: 4.7,
  totalRatings: 43,
  breakdown: [
    { stars: 5, count: 39 },
    { stars: 4, count: 0 },
    { stars: 3, count: 1 },
    { stars: 2, count: 0 },
    { stars: 1, count: 3 },
  ],
};

const REVIEWS_PLACEHOLDER = [
  {
    id: 1,
    name: "Monika Akter",
    rating: 5,
    comment:
      "কভারটা অনেক ভালো, আলহামদুলিল্লাহ। হাতে নেওয়ার সাথে সাথেই প্রিমিয়াম মনে হয়েছে, বক্সিংও যত্ন সহকারে করা ছিল। যারা কম দামে ভালো মানের একটা প্রোডাক্ট খুঁজছেন তাদের জন্য এটা দারুণ অপশন — কালারও একদম ছবির মতোই এসেছে, ফিটিংও একদম পারফেক্ট।",
    image: null,
    likes: 0,
  },
  {
    id: 2,
    name: "Tanvir Hasan",
    rating: 5,
    comment:
      "প্রথমে একটু সন্দেহ ছিল, কিন্তু হাতে পাওয়ার পর সেই সন্দেহ কেটে গেছে। বিল্ড কোয়ালিটি বেশ মজবুত, দীর্ঘদিন ব্যবহারের উপযোগী মনে হয়েছে। ডেলিভারিও নির্ধারিত সময়ের আগেই পেয়েছি, প্যাকেজিং ছিল যত্নসহকারে করা। আবারও কিনব ইনশাআল্লাহ।",
    image: null,
    likes: 4,
  },
  {
    id: 3,
    name: "M***9",
    rating: 1,
    comment:
      "একদম বাজে মাল, কেউ এটা নিয়েন না। পুরাই লস হবে, তার থেকে নিজেকে নিজে কিনলে আরো ভালো হয়। দাম অনুযায়ী কোয়ালিটি একদমই মানানসই না, মার্কেট থেকে একটু বেশি খরচ করলেও অনেক ভালো প্রোডাক্ট পাওয়া যায়।",
    image: null,
    likes: 1,
  },
];

function StarRow({ rating, size = "h-4 w-4" }: { rating: number; size?: string }) {
  return (
    <div className="flex">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`${size} ${
            i < rating ? "fill-accent-marigold text-accent-marigold" : "text-mist"
          }`}
        />
      ))}
    </div>
  );
}

export default function ProductReviews() {
  return (
    <section className="border-t border-mist pt-8">
      <h2 className="mb-5 font-heading text-xl font-bold text-ink">
        Ratings &amp; Reviews
      </h2>

      {/* Rating summary */}
     <div className="mb-6 flex w-full max-w-2xl flex-col gap-6 rounded-lg border border-mist p-2 sm:flex-row sm:items-center sm:gap-10">
  <div className="shrink-0">
    <p className="font-heading text-4xl font-bold text-ink">
      {RATING_SUMMARY.average}
      <span className="text-lg font-medium text-ink/40">/5</span>
    </p>

    <StarRow
      rating={Math.round(RATING_SUMMARY.average)}
      size="h-5 w-5"
    />

    <p className="mt-1 text-xs text-ink/50">
      {RATING_SUMMARY.totalRatings} Ratings
    </p>
  </div>


        <div className="flex-1 space-y-1.5 max-w-2xl">
          {RATING_SUMMARY.breakdown.map((row) => (
            <div key={row.stars} className="flex items-center gap-3 text-xs">
              <div className="flex w-20 shrink-0">
                <StarRow rating={row.stars} size="h-3 w-3" />
              </div>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-mist">
                <div
                  className="h-full rounded-full bg-accent-marigold"
                  style={{
                    width: `${(row.count / RATING_SUMMARY.totalRatings) * 100}%`,
                  }}
                />
              </div>
              <span className="w-6 shrink-0 text-right text-ink/50">{row.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Header: title + sort/filter — visual only, TODO: wire these up */}
      <div className="mb-4 max-w-2xl flex items-center justify-between border-b border-mist pb-3">
        <h3 className="font-heading text-base font-semibold text-ink">Product Reviews</h3>
        <div className="flex items-center gap-4 text-sm text-ink/60">
          <button type="button" className="flex items-center gap-1.5 hover:text-ink">
            <ArrowUpDown className="h-4 w-4" />
            Sort: Relevance
          </button>
          <button type="button" className="flex items-center gap-1.5 hover:text-ink">
            <Filter className="h-4 w-4" />
            Filter: All star
          </button>
        </div>
      </div>

      {/* Review list */}
      <div className="divide-y divide-mist">
        {REVIEWS_PLACEHOLDER.map((review) => (
          <div key={review.id} className="py-5">
            <StarRow rating={review.rating} />
            <p className="mb-2 mt-1 text-sm font-medium text-ink">{review.name}</p>
            <p className="max-w-3xl text-sm leading-relaxed text-ink/80">{review.comment}</p>

            {review.image && (
              <div className="relative mt-3 h-20 w-20 overflow-hidden rounded-md border border-mist bg-mist">
                <Image src={review.image} alt="Review attachment" fill sizes="80px" className="object-cover" />
              </div>
            )}

            {/* TODO: wire this up to real like counts if needed */}
            <button
              type="button"
              className="mt-3 flex items-center gap-1.5 text-xs text-ink/50 hover:text-ink"
            >
              <ThumbsUp className="h-4 w-4" />
              {review.likes}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}