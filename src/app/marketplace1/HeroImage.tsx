import { Box, Image } from "@chakra-ui/react";

const HeroImage: React.FC = () => {
    return (
        <Box width="100%" maxHeight="30vh" overflow="hidden">
            <Image
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/ad6f451e353cbdf5018eb8ae90bc666fd0b13d428ac9937ed2ffdb55bfd9f053?placeholderIfAbsent=true&apiKey=52fdbce7292249cba00180381113d0c6"
                alt="Hero banner"
                objectFit="cover"
                width="100%"
                height="100%"
            />
        </Box>
    );
};

export default HeroImage;