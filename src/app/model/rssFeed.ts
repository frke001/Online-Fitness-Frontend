import { RssItem } from "./rssItem";

export interface RssFeed{
    title: string;
    description: string;
    link: string;
    rssItems: Array<RssItem>;
}