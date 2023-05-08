import { Box, Typography, Button } from "@mui/material";
import { useState, useEffect } from "react";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import "react-toggle/style.css";
import { useNetwork, } from "wagmi";
import {
    bscChainId,
    bscTestnetChainId,
    domainLogoImages,
    domainSuffixes,
} from "../../../config";
import {
    cancelImage,
} from "../../../utils/images";
import { useTheme } from "../../../contexts/theme";
import { getEllipsisTxt } from '../../../utils/formatters';
import Moment from "react-moment";

const SearchDetailModal = (
    props
) => {
    const {
        theme
    } = useTheme();
    const { chain, } = useNetwork();
    const [results] = useState([])
    const [detailInfo] = useState([])
    const [setDetailName] = useState('')
    const [domainInfo, setDomainInfo] = useState({});
    const [isOpen, setIsOpen] = useState(false);
    const [domainLogoImage, setDomainLogoImage] = useState('');

    useEffect(() => {
        const chainId = chain?.id !== undefined ? chain.id :
            process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET === "mainnet" ? bscChainId : bscTestnetChainId;
        setDomainLogoImage(domainLogoImages[chainId]);
    }, [chain])

    useEffect(() => {
        setIsOpen(props.isOpen)
    }, [props])

    useEffect(() => {
        if ((props.id >= 0) && results.length > 0) {
            setDomainInfo(results[props.id])
            setDetailName(results[props.id].name);
        }
    }, [results, props, setDetailName])

    return (
        <Dialog
            open={isOpen}
            color="primary"
            onClose={props.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            sx={{
                ".MuiPaper-root": {
                    maxWidth: '380px',
                    color: theme === 'dark-theme' ? 'white' : 'black',
                    background: theme === 'dark-theme' ? '#353535' : 'white',
                    borderRadius: "20px"
                },
                ".MuiDialogContentText-root": {
                    color: theme === 'dark-theme' ? 'white' : 'black',
                },
            }}
        >
            <DialogTitle
                id="alert-dialog-title"
                sx={{
                    fontWeight: '600',
                    fontSize: '28px',
                    lineHeight: '39px'
                }}
            // color={theme == 'dark-theme' ? 'white' : 'black'}
            >
                {"Register Status"}
            </DialogTitle>

            <img
                src={cancelImage}
                style={{
                    position: 'absolute',
                    width: '20px',
                    height: '20px',
                    right: '30px',
                    top: '18px',
                    cursor: 'pointer'
                }}
                onClick={props.handleClose}
                alt=""
            />

            {
                chain && (
                    <DialogContent
                        sx={{
                            paddingBottom: '12px'
                        }}
                    >
                        <Box
                            sx={{
                                backgroundColor: theme === 'dark-theme' ? '#2A2A2A' : 'white',
                            }}
                        >
                            <Box
                                display={'flex'}
                                sx={{ flexDirection: 'row' }}
                            >
                                <Box
                                    sx={{
                                        m: 1,
                                        p: 1,
                                        width: '100%',
                                    }}
                                    gap={'20px'}
                                    display="flex"
                                >
                                    <Box
                                        sx={{
                                            borderRadius: '16px',
                                            marginBottom: '8px',
                                            position: 'relative'
                                        }}
                                        backgroundColor={theme === 'dark-theme' ? 'blackk' : 'white'}
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
                                                alt=""
                                            />
                                            {
                                                domainInfo?.status ? (
                                                    <Typography
                                                        sx={{ opacity: '0.5' }}
                                                        fontSize={{ xs: '15px', md: '20px' }}
                                                        fontWeight={'700'}
                                                        variant="h5"
                                                        color={theme === 'dark-theme' ? 'white' : 'black'}
                                                    >
                                                        {domainInfo?.name}.{domainSuffixes[chain.id]}
                                                    </Typography>
                                                ) : (
                                                    <Typography
                                                        sx={{ opacity: '1' }}
                                                        fontSize={{ xs: '15px', md: '20px' }}
                                                        fontWeight={'700'}
                                                        variant="h5"
                                                        color={theme === 'dark-theme' ? 'white' : 'black'}
                                                    >
                                                        {domainInfo?.name}.{domainSuffixes[chain.id]}
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
                                                <Typography
                                                    sx={{ ml: '30px' }}
                                                    fontSize={{ xs: '13px', md: '20px' }}
                                                // color={theme == 'dark-theme' ? 'white' : 'black'}
                                                >
                                                    {'ENS Domain is registered already.'}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        {
                                            detailInfo && (
                                                <>
                                                    <Box
                                                        display="flex"
                                                        sx={{
                                                            mt: 1,
                                                            width: '80%'
                                                        }}
                                                    >
                                                        <Typography
                                                            fontSize={{ xs: '15px', md: '20px' }}
                                                            color={theme === 'dark-theme' ? 'white' : 'black'}
                                                        >
                                                            owner:
                                                        </Typography>
                                                        <CopyToClipboard text={detailInfo.owner}
                                                            onCopy={() => window.alert("copied")}>
                                                            <Typography
                                                                fontSize={{ xs: '15px', md: '20px' }}
                                                                color={theme === 'dark-theme' ? 'white' : 'black'}
                                                                sx={{ ml: '10px' }}
                                                            >
                                                                {getEllipsisTxt(detailInfo.owner, 5)}
                                                            </Typography>
                                                        </CopyToClipboard>
                                                    </Box>
                                                    <Box
                                                        display="flex"
                                                        sx={{
                                                            mt: 1,
                                                            width: '80%'
                                                        }}
                                                    >
                                                        <Typography
                                                            fontSize={{ xs: '15px', md: '20px' }}
                                                            color={theme === 'dark-theme' ? 'white' : 'black'}
                                                        >
                                                            time:
                                                        </Typography>
                                                        <Typography
                                                            fontSize={{ xs: '15px', md: '20px' }}
                                                            color={theme === 'dark-theme' ? 'white' : 'black'}
                                                            sx={{ ml: '10px' }}
                                                        >
                                                            <Moment format="YYYY.MM.DD HH:mm">
                                                                {new Date(parseInt(detailInfo.buyDate + '000'))}
                                                            </Moment>
                                                        </Typography>
                                                    </Box>
                                                    <Box
                                                        display="flex"
                                                        sx={{
                                                            mt: 1,
                                                            width: '80%'
                                                        }}
                                                    >
                                                        <Typography
                                                            fontSize={{ xs: '15px', md: '20px' }}
                                                            color={theme === 'dark-theme' ? 'white' : 'black'}
                                                        >
                                                            expire time:
                                                        </Typography>
                                                        <Typography
                                                            fontSize={{ xs: '15px', md: '20px' }}
                                                            color={theme === 'dark-theme' ? 'white' : 'black'}
                                                            sx={{ ml: '10px' }}
                                                        >
                                                            {detailInfo.durationTime / (1000 * 24 * 60 * 60)}days
                                                        </Typography>
                                                    </Box>
                                                </>
                                            )
                                        }
                                    </Box>
                                </Box>

                            </Box>
                        </Box >
                    </DialogContent>
                )
            }

            <DialogActions>
                <Button
                    position={"absolute"}
                    sx={{
                        background: 'linear-gradient(86.23deg, #4BD8D8 -48.31%, #146EB4 114.96%)',
                        width: '100px',
                        height: '31px',
                        marginRight: '28px',
                        textTransform: 'capitalize',
                        color: 'white',
                        borderRadius: '12px',
                    }}
                    onClick={props.handleClose}
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog >
    )
}
export default SearchDetailModal
