import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import './NewsFeed.css';
import { toast } from "react-toastify";
import { useQuery } from '@tanstack/react-query';


function NewsFeed() {
  const [firstName, setFirstName] = useState(null);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      toast.success("Logged out!");
      window.location.href = "/login";
    } catch (error) {
      console.error(error.message);
      toast.error("Logout failed");
    }
  };

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const fetchUserData = async () => {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setFirstName(data.firstName || data.first_name || "User");
        } else {
          setFirstName("User");
        }
      };
      fetchUserData();
    }
  }, []);

const fetchArticles = async() => {
  const res = await axios.get("https://api.spaceflightnewsapi.net/v4/articles/?format=json&limit=10");
  return res.data.results;
}

  const { data: articles, isLoading, isError } = useQuery({
    queryKey: ['space-article'],
    queryFn: fetchArticles,
    staleTime: 5 * 60 * 1000,  //avoiding refetch for 5 minutes
  });
useEffect(() => {
  if (articles) {
    console.log("Fetched articles", articles);
  }
}, [articles]);

  return (
    <div className="news-feed">
      <h2>Welcome {firstName ? firstName : "User"}</h2>
      <h2>🚀 Latest Space News</h2>
      {isLoading ? (
        <p>Loading news...</p>
      ) : isError ? (
        <p>Error fetching news.</p>
      ) : (
        <div className="articles-container">
          {articles.map(article => (
            <div key={article.id} className="article-card">
              <img src={article.image_url} alt={article.title} />
              <h3>{article.title}</h3>
              <p>{article.summary.slice(0, 100)}...</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
            </div>
          ))}
        </div>
      )}
      <button className="btn btn-primary" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default NewsFeed;
