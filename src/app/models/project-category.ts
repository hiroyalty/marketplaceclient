export interface ProjectCategory {
    _id: string;
    pctitle: string;
    pcdescription: string;
    subcategories: [
        { subcategory: { type: string }
    }]
}