import Link from "next/link";
import Image from "next/image";

export default function Brand({ priority = false }) {
  return (
    <Link className="brand" href="/" aria-label="PrimeShow Entertainment — home">
      <Image
        className="brand-logo"
        src="/images/primeshow-logo.png"
        alt="PrimeShow Entertainment"
        width={300}
        height={200}
        priority={priority}
        unoptimized
      />
    </Link>
  );
}
