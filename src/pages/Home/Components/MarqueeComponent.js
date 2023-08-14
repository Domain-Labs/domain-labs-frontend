import { binanceImage, ensImage } from 'utils/images';

import { Box } from '@mui/system';
import Marquee from 'react-simple-marquee';
import { useTheme } from 'contexts/theme';

const MarqueeComponent = () => {
  const { bgColor, color } = useTheme();

  const exampleDomains = [
    {
      logo: ensImage,
      domain: 'Amazon.eth',
    },
    {
      logo: ensImage,
      domain: 'Coke.eth',
    },
    {
      logo: ensImage,
      domain: 'Apple.eth',
    },
    {
      logo: ensImage,
      domain: 'Meta.eth',
    },
    {
      logo: ensImage,
      domain: 'Microsoft.eth',
    },
    {
      logo: binanceImage,
      domain: 'Baidu.bnb',
    },
    {
      logo: binanceImage,
      domain: 'Samsung.bnb',
    },
    {
      logo: binanceImage,
      domain: 'Honda.bnb',
    },
    {
      logo: binanceImage,
      domain: 'Shell.bnb',
    },
    {
      logo: binanceImage,
      domain: 'Toyota.bnb',
    },
  ];

  return (
    <Box>
      <Marquee
        duration={40000}
        background={bgColor}
        height="150px"
        width="100%"
        reverse={true}
        align="center"
        axis="X"
      >
        {exampleDomains.map((item, index) => (
          <Box padding={'0 50px'} display={'flex'} gap={'10px'} key={index}>
            <img src={item.logo} alt="logo" />
            <h1 color={color}>{item.domain}</h1>
          </Box>
        ))}
      </Marquee>
    </Box>
  );
};

export default MarqueeComponent;
