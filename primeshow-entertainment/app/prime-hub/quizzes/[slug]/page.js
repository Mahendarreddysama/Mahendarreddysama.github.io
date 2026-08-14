import { notFound } from "next/navigation";
import QuizExperience from "@/components/hub/QuizExperience";
import { getQuizBySlug, quizzes } from "@/content/hub";
import {createMetadata} from "@/lib/seo";
export function generateStaticParams(){return quizzes.map(quiz=>({slug:quiz.slug}))}
export async function generateMetadata({params}){const {slug}=await params;const quiz=getQuizBySlug(slug);if(!quiz)return{};return createMetadata({title:`${quiz.movie} Quiz`,description:`Test your ${quiz.movie} knowledge in five questions.`,path:`/prime-hub/quizzes/${slug}`,image:quiz.image})}
export default async function QuizPage({params}){const {slug}=await params;const quiz=getQuizBySlug(slug);if(!quiz)notFound();return <QuizExperience quiz={quiz}/>}
