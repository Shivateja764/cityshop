import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function Success() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const handleGoHome = () => {
		navigate("/");
	};

	const handleGoMenu = () => {
		navigate("/menu");
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
			<div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-8 text-center">

				{/* Animated checkmark */}
				<div className="flex items-center justify-center mb-6">
					<div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center animate-bounce">
						<svg
							className="w-14 h-14 text-green-500"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2.5}
								d="M5 13l4 4L19 7"
							/>
						</svg>
					</div>
				</div>

				{/* Title */}
				<h1 className="text-3xl font-bold text-slate-800 mb-2">
					Payment Successful!
				</h1>
				<p className="text-slate-500 text-base mb-6">
					Thank you for your purchase. Your order has been confirmed
					and will be processed shortly.
				</p>

				{/* Order Details Card */}
				<div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 text-left">
					<h2 className="text-sm font-semibold text-green-800 mb-3 uppercase tracking-wide">
						Order Summary
					</h2>
					<div className="flex justify-between items-center mb-2">
						<span className="text-sm text-slate-600">Status</span>
						<span className="text-sm font-semibold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
							Confirmed
						</span>
					</div>
					<div className="flex justify-between items-center mb-2">
						<span className="text-sm text-slate-600">
							Estimated Delivery
						</span>
						<span className="text-sm font-semibold text-slate-700">
							3–7 Business Days
						</span>
					</div>
					<div className="flex justify-between items-center">
						<span className="text-sm text-slate-600">
							Payment Method
						</span>
						<span className="text-sm font-semibold text-slate-700">
							Credit / Debit Card
						</span>
					</div>
				</div>

				{/* Divider */}
				<div className="border-t border-slate-100 mb-6" />

				{/* Action Buttons */}
				<div className="flex flex-col gap-3">
					<button
						onClick={handleGoHome}
						className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
					>
						Back to Home
					</button>
					<button
						onClick={handleGoMenu}
						className="w-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold py-3 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
					>
						Continue Shopping
					</button>
				</div>

				{/* Footer note */}
				<p className="text-xs text-slate-400 mt-6">
					A confirmation email has been sent to your registered email
					address.
				</p>

				{/* Powered by Stripe */}
				<div className="flex items-center justify-center gap-1 mt-4">
					<span className="text-xs text-slate-400">Secured by</span>
					<span className="text-xs font-bold italic text-indigo-500">
						stripe
					</span>
				</div>
			</div>
		</div>
	);
}

export default Success;
