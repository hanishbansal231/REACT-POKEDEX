function Pokemon({name,image}){
    // console.log(image);
    return(
        <div>
            <div>
                {name}
            </div>
            <div>
                {
                    <img 
                    src={image} 
                    alt={name} 
                    />
                }
            </div>
        </div>
    );
}

export default Pokemon;