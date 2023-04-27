import { Box, Typography, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import "react-toggle/style.css";
import { useNetwork, } from "wagmi";
import {
    domainSuffixes,
    domainLogoImages,
    domainNames,
    bscChainId,
    bscTestnetChainId,
} from "../../config";
import {
    useBulkIsDomain,
} from '../../utils/interact';
import {
    blackVectorImage,
    whiteVectorImage,
    whiteBookmarkImage,
    blackBookmarkImage,
    blackOnshoppingImage,
    whiteOffShoppingImage,
    blackOffshoppingImage,
} from "../../utils/images";
import { useDappContext } from "../../utils/context";
import SearchDetailModal from "../Modal/SearchDetailModal";

const SearchResultComponent = () => {
    const {
        theme,
        cartStatus,
        setCartStatus,
    } = useDappContext();
    const bulkIsDomain = useBulkIsDomain();
    const { chain, } = useNetwork();
    const navigate = useNavigate()
    const [results, setResults] = useState([])
    const [sale, setSale] = useState([]);
    const [isSelectedAll, setIsSelectedAll] = useState(false);
    const [domainLogoImage, setDomainLogoImage] = useState('');
    const [searchId, setSearchId] = useState(0);
    const [isOpenSearchDetailModal, setIsOpenSearchDetailModal] = useState(false);

    const addToCart = (id) => {
        console.log("id: ", id);

        let tempArray = Array.from(sale)
        console.log("temp array: ", tempArray);

        tempArray[id] = true;

        setSale(tempArray);
        let cart = cartStatus.cart;
        !cart ? cart = 0 : cart = cart;

        console.log("cartStatus: ", cartStatus);

        let tempArray1 = cartStatus.cartNames ? cartStatus.cartNames.slice() : []
        console.log("tempArray1: ", tempArray1);
        console.log({ id: id, name: results[id].name })
        console.log("current cart:   ", { ...cartStatus, cart: cart * 1 + 1, cartNames: tempArray1 })

        tempArray1.push({ id: id, name: results[id].name })
        setCartStatus({ ...cartStatus, cart: cart + 1, cartNames: tempArray1 })
    }

    const removeFromCart = (id) => {
        let tempArray = Array.from(sale)
        tempArray[id] = false;
        setSale(tempArray)
        let cart = cartStatus.cart;
        console.log(cart)
        let tempArray1 = Array.from(cartStatus.cartNames)
        let temp;
        tempArray1.map((val, idx) => {
            if (val.id == id)
                temp = idx
        })
        tempArray1.slice(temp, 1)
        setCartStatus({ ...cartStatus, cart: cart * 1 - 1, cartNames: tempArray1 })
    }

    const onClickToDetail = (id) => {
        if (results[id].status) {
            setSearchId(id);
            setIsOpenSearchDetailModal(true);
        }
    }

    const handleSelectOrDeselectAll = () => {
        console.log("results: ", results);
        let tempArray = Array.from(sale)

        let cartNames = [];
        results?.map((result, index) => {
            if (!result.status) {
                cartNames.push({ id: index, name: result.name });
                tempArray[index] = true;
            }
        });

        setSale(tempArray);
        console.log("cart names: ", cartNames);
        console.log({
            ...cartStatus,
            cart: cartNames.length,
            cartNames: cartNames,
        });
        setCartStatus({
            ...cartStatus,
            cart: cartNames.length,
            cartNames: cartNames,
        })
    }

    useEffect(() => {
        if (bulkIsDomain.isLoading) return;
        console.log("bulk is dmomain", bulkIsDomain.result);
        if (bulkIsDomain.status) {
            let tempArray = []
            {
                bulkIsDomain.status && cartStatus.names?.map((name, id) => {
                    tempArray[id] = {};
                    tempArray[id].status = bulkIsDomain?.result[id];
                    tempArray[id].name = name;
                })
                setResults(tempArray);
            }
        }
    }, [cartStatus, bulkIsDomain.isLoading])

    useEffect(() => {
        const chainId = chain?.id != undefined ? chain.id :
            process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? bscChainId : bscTestnetChainId;
        setDomainLogoImage(domainLogoImages[chainId]);
    }, [chain])

    return (
        <>
            <Box
                mt={'60px'}
                sx={{ flexDirection: 'row' }}
            >
                {
                    (results.length > 0) && (
                        <Box
                            display={'flex'}
                            justifyContent={'right'}
                        >
                            <Button
                                sx={{
                                    color: 'white',
                                    px: '20px',
                                    py: '10px',
                                    background: 'linear-gradient(79.42deg, #4BD8D8 -28.43%, #146EB4 125.83%)',
                                    borderRadius: '8px',
                                    width: '150px',
                                }}
                                onClick={() => handleSelectOrDeselectAll()}
                            >
                                {
                                    !isSelectedAll ? `Select All` : `UnSelect All`
                                }
                            </Button>
                        </Box>
                    )
                }
                <Box
                    sx={{
                        marginTop: '20px',
                        paddingBottom: '40px',
                        gridTemplateColumns: {
                            lg: 'repeat(4, 1fr)',
                            md: 'repeat(3, 1fr)',
                            sm: 'repeat(2, 1fr)',
                            xs: 'repeat(1, 1fr)',
                        },
                    }}
                    gap={'20px'}
                    display="grid"
                >
                    {
                        results?.map((result, id) => (
                            sale[id] ? (
                                <Box
                                    key={id}
                                    sx={{
                                        padding: '25px 20px 10px 20px',
                                        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                                        borderRadius: '16px',
                                        marginBottom: '8px',
                                        background: 'linear-gradient(79.42deg, #4BD8D8 -28.43%, #146EB4 125.83%)'
                                    }}
                                    onClick={() => onClickToDetail(id)}
                                >
                                    <Box
                                        justifyContent='center'
                                        display='inline-flex'
                                        gap={'5px'}
                                        alignItems={'center'}
                                        textAlign={'left'}
                                    >
                                        <img
                                            src={domainLogoImage}
                                            width={'21px'}
                                            height={'24px'}
                                            style={{
                                                marginLeft: '5px',
                                                cursor: 'pointer'
                                            }}
                                        />
                                        <Typography
                                            sx={{ opacity: '1' }}
                                            fontSize={{
                                                md: '1.8vw',
                                                sm: '25px'
                                            }}
                                            fontWeight={'700'}
                                            variant="h5"
                                            color="white"
                                        >
                                            {result.name}.{domainSuffixes[chain.id]}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Box
                                            display="flex"
                                            sx={{ width: 1 }}
                                            justifyContent="space-between"
                                        >
                                            <Typography
                                                sx={{ ml: '30px' }}
                                                fontSize={{
                                                    md: '1.3vw',
                                                    sm: '18px'
                                                }}
                                                color="white"
                                            >
                                                {`${domainNames[chain.id]} Domain is available.`}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            float: 'right',
                                            gap: '20px',
                                            marginTop: '15px',
                                            bottom: '10px',
                                            right: '20px'
                                        }}>

                                        <img
                                            src={whiteBookmarkImage}
                                            style={{
                                                cursor: 'pointer'
                                            }}
                                        />
                                        <img
                                            src={whiteOffShoppingImage}
                                            style={{
                                                cursor: 'pointer'
                                            }}
                                            onClick={() => removeFromCart(id)}
                                        />

                                        {/* <img src={theme == 'dark-theme' ? whiteOffShoppingImage: blackOffshoppingImage}/>*/}
                                    </Box>
                                </Box>
                            ) : (
                                <Box
                                    key={id}
                                    sx={{
                                        padding: '25px 20px 10px 20px',
                                        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                                        borderRadius: '16px',
                                        marginBottom: '8px',
                                    }}
                                    onClick={() => onClickToDetail(id)}
                                    backgroundColor={'#D2EBFF'}
                                >
                                    <Box
                                        justifyContent='center'
                                        display='inline-flex'
                                        gap={'5px'}
                                        alignItems={'center'}
                                        textAlign={'left'}
                                    >
                                        <img
                                            src={domainLogoImage}
                                            width={'21px'}
                                            height={'24px'}
                                            style={{ marginLeft: '5px' }}
                                        />
                                        {
                                            result.status ? (
                                                <Typography
                                                    sx={{ opacity: '0.5' }}
                                                    fontSize={{ md: '1.8vw', sm: '25px' }}
                                                    fontWeight={'700'}
                                                    variant="h5"
                                                >
                                                    {result.name}.{domainSuffixes[chain.id]}
                                                </Typography>
                                            ) : (
                                                <Typography
                                                    sx={{ opacity: '1' }}
                                                    fontSize={{ md: '1.8vw', sm: '25px' }}
                                                    fontWeight={'700'}
                                                    variant="h5"
                                                >
                                                    {result.name}.{domainSuffixes[chain.id]}
                                                </Typography>
                                            )
                                        }
                                    </Box>
                                    <Box>
                                        <Box
                                            display="flex"
                                            sx={{ width: 1 }}
                                            justifyContent="space-between"
                                        >
                                            {
                                                result.status ? (
                                                    <Typography
                                                        sx={{ ml: '30px' }}
                                                        fontSize={{ md: '1.3vw', sm: '18px' }}
                                                        color={'#868686'}
                                                    >
                                                        {'This Domain is registered already.'}
                                                    </Typography>
                                                ) : (
                                                    <Typography
                                                        sx={{ ml: '30px' }}
                                                        fontSize={{ md: '1.3vw', sm: '18px' }}
                                                    >
                                                        {'This Domain is available.'}
                                                    </Typography>
                                                )
                                            }
                                        </Box>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            float: 'right',
                                            gap: '20px',
                                            marginTop: '15px',
                                            bottom: '10px',
                                            right: '20px',
                                        }}
                                    >
                                        {
                                            result.status ? (
                                                <>
                                                    <img src={blackBookmarkImage} />
                                                    <img src={blackOffshoppingImage} />
                                                </>
                                            ) : (
                                                <>
                                                    <img
                                                        src={blackBookmarkImage}
                                                        style={{
                                                            opacity: '0.5',
                                                            cursor: 'pointer'
                                                        }}
                                                    />
                                                    <img
                                                        src={blackOnshoppingImage}
                                                        style={{
                                                            opacity: '0.5',
                                                            cursor: 'pointer'
                                                        }}
                                                        onClick={() => addToCart(id)}
                                                    />
                                                </>
                                            )
                                        }
                                        {/* <img src={theme == 'dark-theme' ? whiteOffShoppingImage: blackOffshoppingImage}/>*/}
                                    </Box>
                                </Box>
                            )
                        ))
                    }
                </Box>
            </Box>
            <SearchDetailModal
                isOpen={isOpenSearchDetailModal && (searchId >= 0) && (results[searchId].status)}
                handleClose={() => setIsOpenSearchDetailModal(false)}
                id={searchId}
            />
        </>
    )
}

export default SearchResultComponent