<script>
  import MeetupGrid from '../temp/MeetupGrid.svelte';
  let meetups = [
    {
      id: 'm1',
      title: 'Code',
      subtitle: 'Learn',
      description: 'Today',
      imageUrl:
        'https://images.unsplash.com/photo-1627215477561-f0b7755115e9?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      address: 'Aveiro',
      contactEmail: 'code@test.com',
    },
    {
      id: 'm2',
      title: 'Learn',
      subtitle: 'Code',
      description: 'Today',
      imageUrl:
        'https://images.unsplash.com/photo-1627212224531-5241828d0f6d?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      address: 'Porto',
      contactEmail: 'code@2.com',
    },
  ];

  let title = '';
  let subtitle = '';
  let address = '';
  let email = '';
  let description = '';
  let imageUrl = '';

  const addMeetup = () => {
    const newMeetup = {
      id: Math.random().toString(),
      title,
      subtitle,
      address,
      contactEmail: email,
      description,
      imageUrl,
    };

    meetups = [newMeetup, ...meetups];
  };
</script>

<section>NEW CHALLENGE</section>
<main>
  <form on:submit|preventDefault={addMeetup}>
    <div class="form-control">
      <label for="title">Title</label>
      <input type="text" id="title" bind:value={title} />
    </div>
    <div class="form-control">
      <label for="subtitle">Subtitle</label>
      <input type="text" id="subtitle" bind:value={subtitle} />
    </div>
    <div class="form-control">
      <label for="address">Address</label>
      <input type="text" id="address" bind:value={address} />
    </div>
    <div class="form-control">
      <label for="imageUrl">imageUrl</label>
      <input type="text" id="imageUrl" bind:value={imageUrl} />
    </div>
    <div class="form-control">
      <label for="email">E-Mail</label>
      <input type="email" id="email" bind:value={email} />
    </div>
    <div class="form-control">
      <label for="description">Description</label>
      <textarea rows="3" id="description" bind:value={description} />
    </div>
    <button type="submit">Submit</button>
  </form>
  <MeetupGrid {meetups} />
</main>
