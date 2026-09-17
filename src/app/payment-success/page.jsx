import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function PaymentSuccessPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-4 text-center">
      <CheckCircle2 className="mb-4 h-16 w-16 text-brand-teal" />
      <h1 className="mb-2 font-heading text-2xl font-bold text-ink">Payment successful</h1>
      <p className="mb-6 text-sm text-ink/60">
        Thank you for your order. A confirmation has been sent to your email.
      </p>
      <Link
        href="/products"
        className="rounded-md bg-brand-teal px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-teal-dark"
      >
        Continue shopping
      </Link>
    </div>
  );
}