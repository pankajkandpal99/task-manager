export interface IGame {
    title: string;
    description: string;
    category: string;
    gameUrl: string;
    isFeatured: boolean;
    isNew: boolean;
    minPlayers: number;
    maxPlayers: number;
    uploadPath: string;
    thumbnail: {
        publicUrl: string;
        path?: string;
        originalFilename?: string;
        mimetype?: string;
        size?: number;
    };
    createdBy: any;
    updatedBy?: any;
}
