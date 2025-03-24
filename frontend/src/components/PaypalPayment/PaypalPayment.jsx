import { PayPalButtons } from '@paypal/react-paypal-js'

const PaypalPayment = () => {
  return (
    <PayPalButtons
      createOrder={async () => {
        const response = await fetch(
          'http://localhost:8000/api/paypal/create-order',
          {
            method: 'POST'
          }
        )
        const data = await response.json()
        return data.id // Trả về Order ID
      }}
      onApprove={async data => {
        const response = await fetch(
          `http://localhost:8000/api/paypal/capture-payment/${data.orderID}`,
          {
            method: 'POST'
          }
        )
        const paymentData = await response.json()
        console.log('Thanh toán thành công:', paymentData)
      }}
    />
  )
}

export default PaypalPayment
