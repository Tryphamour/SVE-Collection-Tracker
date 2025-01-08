import { SetMetadata } from '@nestjs/common';

// overrides the global guard
export const IS_PUBLIC_KEY = 'IS_PUBLIC';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
