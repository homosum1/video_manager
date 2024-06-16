export interface Video {
    availableResolutions: string; 
    averageWatchTime: number; 
    captions: any[]; 
    category: string;
    chapters: any[];
    collectionId: string; 
    dateUploaded: string; 
    encodeProgress: number; // e.g., 100
    framerate: number; // e.g., 30
    guid: string; // e.g., "b9314ef5-9459-4a42-8b96-30e528585490"
    hasMP4Fallback: boolean; // e.g., true
    height: number; // e.g., 270
    isPublic: boolean; // e.g., false
    length: number; // e.g., 31
    metaTags: any[]; // e.g., []
    moments: any[]; // e.g., []
    rotation: number; // e.g., 0
    status: number; // e.g., 4
    storageSize: number; // e.g., 3080261
    thumbnailCount: number; // e.g., 15
    thumbnailFileName: string; // e.g., "thumbnail.jpg"
    title: string; // e.g., "example_video.mp4"
    totalWatchTime: number; // e.g., 0
    transcodingMessages: any[]; // e.g., []
    videoLibraryId: number; // e.g., 252136
    views: number; // e.g., 0
    width: number; // e.g., 480
  }