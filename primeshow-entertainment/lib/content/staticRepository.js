import { articles,awards,galleries,hubContent,quizzes,upcomingProjects } from "../../content/hub.js";
import { movies } from "../../content/movies.js";
const bySlug=(items,slug)=>items.find(item=>item.slug===slug);
export const staticContentRepository=Object.freeze({getHub:()=>hubContent,getMovies:()=>movies,getMovie:slug=>bySlug(movies,slug),getArticles:()=>articles,getArticle:slug=>bySlug(articles,slug),getQuizzes:()=>quizzes,getQuiz:slug=>bySlug(quizzes,slug),getAwards:()=>awards,getGalleries:()=>galleries,getUpcomingProjects:()=>upcomingProjects});
