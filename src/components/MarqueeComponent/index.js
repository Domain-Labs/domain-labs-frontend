import Marquee from "react-easy-marquee";
import { Box } from "@mui/system";
import ensLogo from '../../assets/image/svgs/ens-logo.svg';
import binanceLogo from '../../assets/image/svgs/binance-logo.svg';
import { useDappContext } from "../../utils/context";

const MarqueeComponent = () => {
    const { theme, } = useDappContext();

    const exampleDomains = [
        {
            logo: ensLogo,
            domain: 'Amazon.eth',
        },
        {
            logo: ensLogo,
            domain: 'Coke.eth',
        },
        {
            logo: ensLogo,
            domain: 'Apple.eth',
        },
        {
            logo: ensLogo,
            domain: 'Meta.eth',
        },
        {
            logo: ensLogo,
            domain: 'Microsoft.eth',
        },
        {
            logo: binanceLogo,
            domain: 'Baidu.bnb',
        },
        {
            logo: binanceLogo,
            domain: 'Samsung.bnb',
        },
        {
            logo: binanceLogo,
            domain: 'Honda.bnb',
        },
        {
            logo: binanceLogo,
            domain: 'Shell.bnb',
        },
        {
            logo: binanceLogo,
            domain: 'Toyota.bnb',
        },
    ];

    return (
        <Box>
            <Marquee
                duration={40000}
                background={theme == 'dark-theme' ? '#2A2A2A' : 'white'}
                height="150px"
                width="100%"
                reverse={true}
                align="center"
            >
                {
                    exampleDomains.map((item) => (
                        <Box
                            padding={'0 50px'}
                            display={'flex'}
                            gap={'10px'}
                        >
                            <img src={item.logo} />
                            <h1
                                style={{
                                    color: theme == 'dark-theme' ? 'white' : '#2A2A2A',
                                }}
                            >
                                {item.domain}
                            </h1>
                        </Box>

                    ))
                }
            </Marquee>
        </Box>
    );
};

export default MarqueeComponent;