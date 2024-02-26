// @ts-check
 
/** @type {import('next').NextConfig} */
const nextConfig = {
    /* config options here */
    async headers() {
        return [
        {
            source: '/home',
            headers: [
            {
                key: 'x-custom-header',
                value: 'custom header name',
            }
            ],
        },
        ]
    },
}
  
   
 