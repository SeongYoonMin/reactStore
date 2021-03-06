import React, { useEffect, useState } from "react"
import clayful from "clayful/client-js"
import "../../css/PaymentPage.css"
import { useNavigate } from "react-router";
import Postcode from '@actbase/react-daum-postcode';
import Modal from 'react-bootstrap/Modal'
import PostCodeModal from "../../components/PostCodeModal";

function PaymentPage () {
    const navigate = useNavigate();
    const [cart, setCart] = useState({});
    
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState("");
    const [recvUserInfo, setRecvUserInfo] = useState({
        mobile: "",
        full: "",
    })
    const [sendUserInfo, setSentUserInfo] = useState({
        full: "",
        mobile: "",
    })
    const [address, setAddress] = useState({
        postCode: "",
        state: "",
        city: "",
        address1: "",
        address2: "",
        country: "",
    })
    const [isChecked, setIsChecked]  = useState(false);

    const handleSendChange = (event) => {
        const {name, value} = event.target;
        setSentUserInfo((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    const handleRecvChange = (event) => {
        const {name, value} = event.target;
        setRecvUserInfo((prevState) => ({
            ...prevState, [name]: value
        }));
    }

    const onCheckboxClick = () => {
        if(isChecked) {
            setIsChecked(false);
            setRecvUserInfo({
                full: "",
                mobile: "",
            });
        }
        else {
            setIsChecked(true);
            setRecvUserInfo({
                full: sendUserInfo.full,
                mobile: sendUserInfo.mobile,
            })
        }
    }

    useEffect(() => {
        getCartData();
        getPaymentData();
    }, [])

    let Cart = clayful.Cart;
    const getCartData = () => {

        let options = {
            customer: localStorage.getItem('accessToken')
        }

        Cart.getForMe({}, options, function(err, result) {
            if(err) {
                console.log(err.code);
            }

            let data = result.data;
            setCart(data.cart);

        })
    }

    const getPaymentData = () => {
        let PaymentMethod = clayful.PaymentMethod;

        PaymentMethod.list({}, function(err, result) {
            if(err) {
                console.log(err.code);
            }

            let data = result.data;
            setPaymentMethods(data);
        });
    }

    const handleCompletePaymentClick = () => {
        let Customer = clayful.Customer;

        const body = {
            name: {
                full: sendUserInfo.full
            },
            mobile: sendUserInfo.mobile
        }

        let options = {
            customer: localStorage.getItem("accessToken"),
        }

        Customer.updateMe(body, options, function(err, result) {
            if(err) {
                console.log(err.code);
            }

            let data = result.data;

            let items = [];

            cart.items.map((item) => {
                let itemVariable = {};
                itemVariable.bundleItems = item.bundleItems;
                itemVariable.product = item.product._id;
                itemVariable.quantity = item.quantity.raw;
                itemVariable.shippingMethod = item.shippingMethod._id;
                itemVariable.variant = item.variant._id;
                itemVariable._id = item._id;
                return items.push(itemVariable);
            });

            let payload = {
                items,
                currency: cart.currency.payment.code,
                paymentMethod,
                address: {
                    shipping: {
                        name: {
                            full: recvUserInfo.full,
                        },
                        mobile: recvUserInfo.mobile,
                        phone: recvUserInfo.mobile,
                        postcode: address.postCode,
                        state: address.state,
                        city: address.city,
                        address1: address.address1,
                        address2: address.address2,
                        country: "KR"
                    },
                    billing: {
                        name: {
                            full: recvUserInfo.full,
                        },
                        mobile: recvUserInfo.mobile,
                        phone: recvUserInfo.mobile,
                        postcode: address.postCode,
                        state: address.state,
                        city: address.city,
                        address1: address.address1,
                        address2: address.address2,
                        country: "KR"
                    }
                }
            }

            Cart.checkoutForMe('order', payload, options, function(err, result) {
                if(err) {
                    console.log(err.code)
                }

                Cart.emptyForMe(options, function(err, result) {
                    if(err) {
                        console.log(err.code);
                    }
                    navigate('/history');
                })
            })

        })
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCompletePostCode = (data) => {
        
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            }
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }

        setAddress((prevState) => ({
            ...prevState,
            postCode: data.zonecode,
            state: data.side,
            city: data.sigungu,
            address1: fullAddress,
        }))

        handleClose();
    };

    const handleAddress2Change = (event) => {
        setAddress(prevState => ({
            ...prevState,
            address2: event.target.value,
        }))
    }

    return (
        <div className="pageWrapper">    
                <div className="payment">
                    <div style={{width: "100%", display: "flex", borderBottom: "1px solid #d2d2d7"}}>
                        <div style={{width: "50%", fontSize: 24, fontWeight: 500}}>??????</div>
                        <div style={{width: "50%", display: "flex", justifyContent: "end", alignItems: "end"}}>?????? ??? ??????: {cart.total?.amount.raw + 3000}??? (3000??? ?????????)</div>
                    </div>
        
                    <div style={{marginTop: 16, width: "100%", display: "flex"}}>
                        <div style={{width: "49%"}}>
                            <h5>????????? ??????</h5>
                            <input type="text" name="full" placeholder="????????????" value={sendUserInfo.full} onChange={handleSendChange} />
                            <input type="text" name="mobile" placeholder="?????? ?????????" value={sendUserInfo.mobile} onChange={handleSendChange} />
                            <div>
                                <input type="checkbox" id="smaeInfo" name="sameInfo" onChange={onCheckboxClick} checked={isChecked} />
                                <label htmlFor="sameInfo">????????? ????????? ?????? ???????????????.</label>
                            </div>
                        </div>
                        <div style={{width: "2%"}}></div>
                        <div style={{width: "49%"}}>
                            <h5>????????? ??????</h5>
                            <input type="text" name="full" placeholder="????????????" onChange={handleRecvChange} value={recvUserInfo.full} />
                            <input type="text" name="mobile" placeholder="?????? ?????????" onChange={handleRecvChange} value={recvUserInfo.mobile} />
        
                            <h5>?????? ??????</h5>
                            <input type="text" readOnly placeholder="??????" onClick={() => setShow(true)} value={address.address1} />
                            <input type="text" name="address" placeholder="?????? ??????" value={address.address2} onChange={handleAddress2Change} />
                            <input type="text" readOnly placeholder="????????????" value={address.postCode} />
        
                            <h5>??????</h5>
                            <select value={paymentMethod} onChange={(event) => setPaymentMethod(event.target.value)}>
                                <option>?????? ?????? ??????</option>
                                {paymentMethods.map(method => (
                                    <option key={method.slug} value={method.slug}>{method.name}</option>
                                ))}
                            </select>
        
                            <button onClick={handleCompletePaymentClick} style={{width: "100%", marginTop: 10}}>??????</button>
                            {
                                paymentMethod === "DAMACGVU23S9" && <p>???????????? : 123-4567-2434-83 ?????? ?????????</p>
                            }
                            <PostCodeModal show={show} handleClose={handleClose} handleCompletePostCode={handleCompletePostCode}/>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default PaymentPage