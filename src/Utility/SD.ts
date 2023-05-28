export enum SD_Roles {
    ADMIN = "admin",
    CUSTOMER = "customer",
}

export enum SD_Status{
    PENDING = "Pending",
    CONFIRMED = "Confirmed",
    PREPARING_FOR_SENDING = "Preparing for sending",
    SENT = "Sent",
    CANCELLED = "Cancelled",
}

export enum SD_Categories{
    Polishers = "Polishers",
    Equipment = "Equipment",
    Files = "Files",
    Cosmetics = "Cosmetics",
}

export enum SD_SortTypes{
    PRICE_LOW_HIGH = "Price Low - High",
    PRICE_HIGH_LOW = "Price High - Low",
    NAME_A_Z = "Name A - Z",
    NAME_Z_A = "Name Z - A",
}
