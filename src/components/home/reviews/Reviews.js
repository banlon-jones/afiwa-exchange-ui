import { Link } from "react-router-dom";
import Review from "./Review";

const Reviews = () => {
    const reviews = [
        {
            id: 1,
            createdAt: '1h ago',
            content: 'Developed by the Intel Corporation, HDCP stands for high-bandwidth digital contegrity of various audio. Add e for an ddditonal something',
            author: {
                name: 'Dark Samurai',
                image: ''
            }
        },
        {
            id: 2,
            createdAt: '1h ago',
            content: 'Developed by the Intel Corporation, HDCP stands for high-bandwidth digital content protection. As the descriptive name implies, HDCP is all about protecting the integrity of various audio. Add more text here for an ddditonal something',
            author: {
                name: 'Do Little',
                image: ''
            }
        },
        {
            id: 3,
            createdAt: '1h ago',
            content: 'Developed by the Intel Corporation, HDCP stands for high-bandwidth digital content protection. As the descriptive name implies, HDCP is all about protecting the integrity of various audio. Add more text here for an ddditonal something',
            author: {
                name: 'Red Spider',
                image: ''
            }
        },
        {
            id: 4,
            createdAt: '1h ago',
            content: 'Developed by the Intel Corporation, HDCP stands for high-bandwidth digital contegrity of various audio. Add e for an ddditonal something',
            author: {
                name: 'Dominic Gray',
                image: ''
            }
        }
    ]
    return (
        <div className="flex items-center flex-col gap-10 py-20">
            <div className="grid grid-cols-2 gap-y-16 gap-x-14 max-w-[1450px]">
                {reviews.map(review => <Review review={review} key={review.id} />)}
            </div>

            <Link className="py-[20px] text-[20px] px-[30px] rounded-3xl bg-slate-200" to='/reviews'>Read More</Link>
        </div>
    )
}

export default Reviews;