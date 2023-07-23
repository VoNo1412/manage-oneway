import { SetMetadata } from "@nestjs/common";

export const PERMISSION_KEY = 'permissions';
export const Permissions = (...permission: Permissions[]) => SetMetadata(PERMISSION_KEY, permission);