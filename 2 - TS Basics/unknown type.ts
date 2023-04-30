let unknownType: unknown; // more restrictive than 'any'
let unknownAge: number;
let anyType: any;

unknownType = 5;
unknownAge = anyType;

if (typeof unknownType === 'number') {
    unknownAge = unknownType;
};