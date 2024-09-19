export default function Profile(props) {
    if (!props.profile) return;
    console.log(props.profile)
    return (
        <div>
            <h1>
                {props.profile.display_name}
            </h1>
            {props.profile.uri}<br/>
            {props.profile.followers.total}
        </div>
    )
}