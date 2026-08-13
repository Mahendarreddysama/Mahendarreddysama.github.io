import { notFound } from "next/navigation";
import MovieDetail from "@/components/services/MovieDetail";
import { getMovieBySlug, movies } from "@/content/movies";
import JsonLd from "@/components/JsonLd";import {absoluteUrl} from "@/content/site";import {breadcrumbSchema,createMetadata} from "@/lib/seo";

export function generateStaticParams() { return movies.filter(movie => movie.hasDetailPage !== false).map(movie => ({ slug: movie.slug })); }

export async function generateMetadata({ params }) {
  const { slug } = await params; const movie = getMovieBySlug(slug);
  if (!movie || movie.hasDetailPage === false) return {};
  return createMetadata({title:movie.title,description:movie.synopsis,path:`/movies/${movie.slug}`,image:movie.heroImage || movie.poster || "/images/poster-sheet.webp",type:"video.movie"});
}

export default async function MoviePage({ params }) {
  const { slug } = await params; const movie = getMovieBySlug(slug); if (!movie || movie.hasDetailPage === false) notFound();
  const related = movies.filter(item => item.hasDetailPage !== false && item.slug !== movie.slug && item.division.some(value => movie.division.includes(value))).slice(0, 3);
  const schema={"@context":"https://schema.org","@type":"Movie",name:movie.title,url:absoluteUrl(`/movies/${movie.slug}`),image:absoluteUrl(movie.heroImage || movie.poster || "/images/poster-sheet.webp"),dateCreated:movie.year==="TBA"?undefined:movie.year,inLanguage:movie.languages,genre:movie.genre,description:movie.synopsis,productionCompany:{"@type":"Organization",name:"PrimeShow Entertainment"}};
  return <><MovieDetail movie={movie} related={related}/><JsonLd data={[schema,breadcrumbSchema([{name:"Home",path:"/"},{name:"Movies",path:"/services/production"},{name:movie.title,path:`/movies/${movie.slug}`}]) ]}/></>;
}
