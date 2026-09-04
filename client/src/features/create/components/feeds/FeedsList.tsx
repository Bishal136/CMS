import React from 'react';
import { IFeedItem } from '../../types/feed.types';
import { FeedArticle } from './FeedArticle';

export interface IFeedsListProps {
  articles: IFeedItem[];
}

export const FeedsList: React.FC<IFeedsListProps> = ({ articles }) => {
  return (
    <div className="space-y-3">
      {articles.map((art) => (
        <FeedArticle key={art.id} article={art} onShare={() => {}} />
      ))}
    </div>
  );
};
