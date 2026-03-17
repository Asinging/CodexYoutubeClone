import numeral from 'numeral';

export const formatViews = (views: number): string => `${numeral(views).format('0.[0]a').toUpperCase()} views`;
