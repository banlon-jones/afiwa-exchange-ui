const Review = ({review}) => {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex gap-4 items-center">
                <img className="h-10 w-10 bg-slate-300 rounded-full" src={review.author.image} alt="review" />
                <h2 className="font-bold text-[28px]">{review.author.name}</h2>
            </div>
            <p className="text-[20px] opacity-60">
                {review.content}
            </p>

            <p className="text-[16px]">{review.createdAt}</p>
        </div>
    )
}

export default Review;