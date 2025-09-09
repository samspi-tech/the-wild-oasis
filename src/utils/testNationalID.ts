export function testNationalID(nationalID: string) {
    return /^[a-zA-Z0-9]{6,12}$/.test(nationalID);
}
