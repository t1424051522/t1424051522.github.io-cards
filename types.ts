
export interface ContentSection {
  title: string;
  content: string;
  color: 'pink' | 'blue' | 'green' | 'orange';
}

export interface StructuredEducationContent {
  mainTitle: string;
  subTitle: string;
  intro: string;
  sections: ContentSection[];
  footerNote: string;
}
