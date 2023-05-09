import { Box, Grid, Typography, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import "react-toggle/style.css";
import { useAccount, useNetwork, useSigner, } from "wagmi";
import {
    bscChainId,
    bscTestnetChainId,
    chainParams,
    clioSubscriptionDurations,
    paymentPerMonth,
    secondsInMonth,
} from "../../../config";
import { useDappContext } from "../../../utils/context";
import './index.scss';
import axios from "axios";
import { getFormattedDateString } from "../../../utils/formatters";
import { getContract, } from "../../../utils/interact";
import { ClioPaymentABI, usdcABI } from "../../../utils/assets";
import { ethers } from "ethers";
import { toast } from "react-toastify";

const ClioSubscriptionModal = (
    props
) => {
    const { data: signer } = useSigner();
    const {
        theme,
        clioSocket,
    } = useDappContext();
    const { chain, } = useNetwork();
    const { address, } = useAccount();
    const [isOpen, setIsOpen] = useState(false);
    const [duration, setDuration] = useState(1);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [subscriptionTimestamp, setSubscriptionTimestamp] = useState(0);
    const [chainId, setChainId] = useState(bscTestnetChainId);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        const chainId = chain?.id != undefined ? chain.id :
            process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? bscChainId : bscTestnetChainId;

        setChainId(chainId);
    }, [chain])

    useEffect(() => {
        setIsOpen(props.isOpen)
    }, [props])

    const handleManageSubscription = async () => {
        try {
            const usdcContract = getContract(
                chainParams[chainId]?.usdcAddress,
                usdcABI,
                signer?.provider
            )
            let tx = await usdcContract.approve(chainParams[chainId]?.clioPaymentAddress, ethers.utils.parseEther((duration * paymentPerMonth).toString()));
            props.handleClose();
            setIsConfirmed(false);
            setIsProcessing(true);
            await tx.wait();

            const clioPaymentContract = getContract(
                chainParams[chainId]?.clioPaymentAddress,
                ClioPaymentABI,
                signer?.provider
            );
            tx = await clioPaymentContract.sendToken(
                ethers.utils.parseEther((duration * paymentPerMonth).toString()),
                duration
            )
            await tx.wait();
            setIsProcessing(false);
        } catch (e) {
            console.log("error: ", e);
        }
    }

    const connectSocket = (clio) => {
        if (!clioSocket) return;

        clioSocket.emit("subscribeToProfile", clio._id);
        clioSocket.on("expiredTimestampUpdated", (expiredTimestamp) => {
            const expiredDate = new Date(expiredTimestamp * 1000);
            console.log("expired date: ", expiredDate);
            toast.success(`You succssfully deposited payment. Your clios is available until ${getFormattedDateString(expiredDate, '.')}`);
        });
    };


    useEffect(() => {
        (async () => {
            if (props.isOpen) {
                let result;
                // check if signed up
                result = (await axios.get(`/clios/is-signedUp/${address}`)).data;
                console.log("is signed up: =======  ", result);
                if (result) {
                    setSubscriptionTimestamp(result?.clioEndTimestamp);
                    console.log("expected time: ", new Date((result?.clioEndTimestamp) * 1000))
                } else {
                    // free-signup
                    const postObject = {
                        wallet: address,
                    };

                    result = (await axios.post(`/clios/free-signup/`, postObject)).data?.result;
                    console.log("result: ", result);
                    setSubscriptionTimestamp(Math.round(Date.now() / 1000));
                }

                console.log("==============================:  ", result);
                connectSocket(result);
            }

        })()
    }, [address, chain, props,])

    return (
        <Dialog
            open={isOpen}
            color="primary"
            maxWidth={'sm'}
            onClose={props.handleClose}
            aria-labelledby="subscription-modal"
            aria-describedby="subscription-modal-description"
            sx={{
                ".MuiPaper-root": {
                    color: theme == 'dark-theme' ? 'white' : 'black',
                    background: theme == 'dark-theme' ? '#353535' : 'white',
                    borderRadius: "20px"
                },
                ".MuiDialogContentText-root": {
                    color: theme == 'dark-theme' ? 'white' : 'black',
                },
            }}
        >
            <DialogTitle
                id="subscription-modal-title"
                fontFamily={'Inter'}
                fontStyle={'normal'}
                fontWeight={'600'}
                fontSize={'32px'}
                lineHeight={'39px'}
                bgcolor={'#282828'}
                color={'white'}
                sx={{
                    px: '83px',
                    pt: '24px',
                }}
                border={'none'}
            >
                {"Clio Subscription Summary"}
            </DialogTitle>

            <DialogContent
                sx={{
                    background: '#282828',
                    color: 'white',
                    pb: '16px',
                }}
            >
                {
                    !isConfirmed && (
                        <>
                            <Box
                                flexDirection={'column'}
                                my={'69px'}
                            >
                                <Box
                                    display={'flex'}
                                    flexDirection={'row'}
                                    justifyContent={'center'}
                                    alignItems={'center'}
                                    gap={'10px'}
                                >
                                    <Box
                                        fontFamily={'Inter'}
                                        fontStyle={'normal'}
                                        fontWeight={'700'}
                                        fontSize={'24px'}
                                        lineHeight={'29px'}
                                        textAlign={'center'}
                                    >
                                        Duration:
                                    </Box>

                                    <Box
                                        className="duration-selet-wrapper"
                                    >
                                        <FormControl fullWidth>
                                            <InputLabel
                                                id="demo-simple-select-label"
                                                sx={{
                                                    color: 'white',
                                                }}
                                            >
                                                Duration
                                            </InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={duration}
                                                label="Duration"
                                                onChange={(e) => setDuration(e.target.value)}
                                                sx={{
                                                    width: '150px',
                                                    color: 'white',
                                                }}
                                            >
                                                {
                                                    clioSubscriptionDurations.map((item, index) => (
                                                        <MenuItem
                                                            key={index}
                                                            value={item.value}
                                                            color={'white'}
                                                        >
                                                            {item.label}
                                                        </MenuItem>
                                                    ))
                                                }
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Box>

                                <Box
                                    mt={'9px'}
                                    display={'flex'}
                                    justifyContent={'center'}
                                    fontFamily={'Inter'}
                                    fontStyle={'normal'}
                                    fontWeight={'700'}
                                    fontSize={'24px'}
                                    lineHeight={'29px'}
                                    textAlign={'center'}
                                >
                                    Final price: ${39 * (duration ?? 0)}
                                </Box>
                            </Box>


                        </>
                    )
                }
                {
                    isConfirmed && (
                        <>
                            <Box
                                mt={'60px'}
                                display={'flex'}
                                justifyContent={'center'}
                                fontFamily={'Inter'}
                                fontStyle={'normal'}
                                fontWeight={'500'}
                                fontSize={'14px'}
                                lineHeight={'17px'}
                                textAlign={'center'}
                            >
                                Thank you, your Clio subscription is active.<br />
                                From this moment you can start enjoying all the power of Clio’s AI
                            </Box>

                            <Box
                                mt={'49px'}
                                mb={'37px'}
                                display={'flex'}
                                justifyContent={'center'}
                                fontFamily={'Inter'}
                                fontStyle={'normal'}
                                fontWeight={'500'}
                                fontSize={'14px'}
                                lineHeight={'17px'}
                                textAlign={'center'}
                            >
                                Your subscription will run until {
                                    getFormattedDateString(new Date(
                                        (subscriptionTimestamp < Math.round(Date.now() / 1000) ?
                                            Math.round(Date.now() / 1000) + duration * secondsInMonth :
                                            subscriptionTimestamp + duration * secondsInMonth) * 1000
                                    ), '/')
                                }
                            </Box>
                        </>
                    )
                }
                <hr
                    color={'#4BD8D8'}
                />

                <Box
                    display={'flex'}
                    justifyContent={'center'}
                    pt={'8px'}
                >
                    {
                        !isConfirmed && (
                            <>
                                <Button
                                    sx={{
                                        background: 'transparent',
                                        width: '100px',
                                        height: '31px',
                                        marginRight: '28px',
                                        textTransform: 'capitalize',
                                        color: 'white',
                                        borderRadius: '12px',
                                        border: '1px solid white',
                                    }}
                                    onClick={props.handleClose}
                                >
                                    Cancel
                                </Button>

                                <Button
                                    sx={{
                                        background: '#146EB4',
                                        width: '100px',
                                        height: '31px',
                                        marginRight: '28px',
                                        textTransform: 'capitalize',
                                        color: 'white',
                                        borderRadius: '12px',
                                    }}
                                    onClick={() => setIsConfirmed(true)}
                                >
                                    Confirm
                                </Button>
                            </>
                        )
                    }
                    {
                        isConfirmed && (
                            <>
                                <Button
                                    sx={{
                                        background: 'transparent',
                                        width: '200px',
                                        height: '31px',
                                        marginRight: '28px',
                                        textTransform: 'capitalize',
                                        color: 'white',
                                        borderRadius: '12px',
                                        border: '1px solid white',
                                    }}
                                    onClick={handleManageSubscription}
                                >
                                    Manage Subscription
                                </Button>

                                <Button
                                    sx={{
                                        background: '#146EB4',
                                        width: '100px',
                                        height: '31px',
                                        marginRight: '28px',
                                        textTransform: 'capitalize',
                                        color: 'white',
                                        borderRadius: '12px',
                                    }}
                                    onClick={() => {
                                        props.handleClose();
                                        setIsConfirmed(false);
                                    }}
                                >
                                    Finish
                                </Button>
                            </>
                        )
                    }
                </Box>
            </DialogContent>
        </Dialog >
    )
}

export default ClioSubscriptionModal
