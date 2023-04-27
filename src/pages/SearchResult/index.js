import { Box, Typography, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import "react-toggle/style.css";
import { useNetwork, } from "wagmi";
import {
    domainSuffixes,
    domainLogoImages,
    domainNames,
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
import SearchDetailModal from "../../components/Modal/SearchDetailModal";
import SearchResultComponent from "../../components/SearchResultComponent";

const SearchResult = () => {
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
        setDomainLogoImage(domainLogoImages[chain.id]);
    }, [chain])

    return (
        <Box
            pt={20}
            px={{ xs: '30px', sm: '40px' }}
            sx={{
                backgroundColor: theme == 'dark-theme' ? '#2A2A2A' : 'white',
                minHeight: 'calc(100vh - 328px)'
            }}
        >
            <Box
                display={{ xs: 'block', sm: "flex" }}
                alignItems={'center'}
            >
                <Box
                    display={'flex'}
                    alignItems={'center'}
                >
                    <img
                        src={theme == 'dark-theme' ? whiteVectorImage : blackVectorImage}
                        width={'15.5px'}
                        height={'31px'}
                        style={{ cursor: 'pointer' }}
                        onClick={() => navigate('/home')}
                    />
                    <Typography
                        fontSize={{
                            md: "24px",
                            xs: "18px"
                        }}
                        fontWeight={700}
                        top={{
                            md: 30,
                            xs: 70
                        }}
                        ml={{ xs: '20px', sm: '34.5px' }}
                        left={{
                            md: 200,
                            xs: 20
                        }}
                        sx={{
                            fontFamily: "Inter",
                            fontWeight: '600',
                            color: theme == 'dark-theme' ? 'white' : 'black',
                            fontSize: '40px',
                            lineHeight: '48px',
                            letterSpacing: '-0.01rem'

                        }}
                    >
                        Search Result
                    </Typography>
                </Box>

                <Box
                    display={'flex'}
                    mt={{ xs: '10px', sm: '0' }}
                >
                    <Typography
                        fontSize={{
                            md: "24px",
                            xs: "18px"
                        }}
                        fontWeight={700}
                        top={{
                            md: 30,
                            xs: 70
                        }}
                        left={{
                            md: 200,
                            xs: 20
                        }}
                        sx={{
                            fontSize: '14px',
                            lineHeight: '17px',
                            color: theme == 'dark-theme' ? 'white' : '#7A7A7A',
                            marginLeft: '20px'
                        }}
                    >
                        {`Domain Labs  > `}
                    </Typography>
                    <Typography
                        ml={'5px'}
                        sx={{
                            fontWeight: '700',
                            fontSize: '14px',
                            lineHeight: '17px',
                            paddngRight: '5px',
                            textDecoration: 'underline',
                            background: 'linear-gradient(87.95deg, #4BD8D8 -3.28%, #146EB4 106.25%)',
                            '-webkit-background-clip': 'text',
                            'text-decoration-line': 'underline',
                            '-webkit-text-fill-color': 'transparent',
                            'background-clip': 'text',
                            'text-fill-color': 'transparent',
                        }}
                    >
                        {` Search results`}
                    </Typography>
                </Box>
            </Box>
            <SearchResultComponent />
        </Box >
    )
}

export default SearchResult