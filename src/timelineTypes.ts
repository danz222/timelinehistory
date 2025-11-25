export interface TimelineEvent {
    id: string;
    year: string;
    description: string;
}

export interface TimelineSegment {
    id: string;
    order: number;
    fromYear: string;
    toYear: string;
    category: string; 
    events: TimelineEvent[];
}