const RefundPolicy = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 text-gray-800 mt-12">
      {/* Intro Text */}
      <h1 className="text-5xl font-semibold text-center">Refund Policy</h1>
      <p className="text-center text-lg mb-8">
        We strive to ensure customer satisfaction. If you&#39;re not happy with your purchase, here&#39;s how we handle refunds and returns.
      </p>

      {/* Refund Policy Sections */}
      <div className="space-y-12">
        <div className="text-center">
          <p className="text-gray-600">
            If you receive a damaged or incorrect product, you may request a return within <strong>7 days</strong> of delivery. The item must be unused and in its original packaging.
          </p>
          <br />
          <p className="text-gray-600">
            Refunds are processed within <strong>5-7 business days</strong> after we receive the returned item. The refund will be credited to your original payment method.
          </p>
          <br />
          <p className="text-gray-600">
            Some products, such as personalized items or hygiene-related goods, may not be eligible for returns. Please check product descriptions for details.
          </p>
          <br />
          <p className="text-gray-600">
            If you wish to cancel an order before it is shipped, you may do so by contacting our support team. Once shipped, standard return policies apply.
          </p>
          <br />
          <p className="text-gray-600">
            Customers are responsible for return shipping costs unless the product is defective or incorrect. We recommend using a trackable shipping method.
          </p>
        </div>

        <div className="text-center">
          <p className="text-gray-600">
            If you have any refund or return queries, feel free to reach out at 
            <a href="mailto:sorasupport@gmail.com" className="text-blue-600 hover:underline">
              sorasupport@gmail.com
            </a>
          </p>
        </div>
      </div>

      {/* CTA Button */}
      <div className="text-center mt-10">
        <button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-900 transition">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default RefundPolicy;
