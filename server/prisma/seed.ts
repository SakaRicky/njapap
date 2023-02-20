import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function seed() {
	await prisma.like.deleteMany();
	await prisma.comment.deleteMany();
	await prisma.post.deleteMany();
	await prisma.user.deleteMany();
	const user1 = await prisma.user.create({
		data: {
			firstName: "Jon",
			lastName: "Doe",
			username: "johndoe",
			email: "john.doe@gmail.com",
			passwordHash:
				"$2a$12$TCL9gaFusbLlVRk.o47Z6.u13X/EmQlZFARCBC9ZOehLVo050QOje",
			dateOfBirth: new Date("2000-01-02"),
			profilePicture:
				"https://images.unsplash.com/photo-1596077058573-d3d8281a190f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
		}
	});
	const rheine = await prisma.user.create({
		data: {
			firstName: "Brigitte",
			lastName: "Ngwa",
			username: "brigittengwa",
			email: "brigitte.ngwa@gmail.com",
			passwordHash:
				"$2a$12$TCL9gaFusbLlVRk.o47Z6.u13X/EmQlZFARCBC9ZOehLVo050QOje",
			dateOfBirth: new Date("1998-08-05"),
			profilePicture:
				"https://plus.unsplash.com/premium_photo-1661597221998-24a4fc0b730a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
		}
	});

	const post1 = await prisma.post.create({
		data: {
			body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer placerat urna vel ante volutpat, ut elementum mi placerat. Phasellus varius nisi a nisl interdum, at ultrices ex tincidunt. Duis nec nunc vel urna ullamcorper eleifend ac id dolor. Phasellus vitae tortor ac metus laoreet rutrum. Aenean condimentum consequat elit, ut placerat massa mattis vitae. Vivamus dictum faucibus massa, eget euismod turpis pretium a. Aliquam rutrum rhoncus mi, eu tincidunt mauris placerat nec. Nunc sagittis libero sed facilisis suscipit. Curabitur nisi lacus, ullamcorper eu maximus quis, malesuada sit amet nisi. Proin dignissim, lacus vitae mattis fermentum, dui dolor feugiat turpis, ut euismod libero purus eget dui.",
			title: "Post 1",
			userId: rheine.id,
			images: [
				"https://images.unsplash.com/photo-1672350162337-24517666566e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
			]
		}
	});
	const post2 = await prisma.post.create({
		data: {
			body: "Proin ut sollicitudin lacus. Mauris blandit, turpis in efficitur lobortis, lectus lacus dictum ipsum, vel pretium ex lacus id mauris. Aenean id nisi eget tortor viverra volutpat sagittis sit amet risus. Sed malesuada lectus eget metus sollicitudin porttitor. Fusce at sagittis ligula. Pellentesque vel sapien nulla. Morbi at purus sed nibh mollis ornare sed non magna. Nunc euismod ex purus, nec laoreet magna iaculis quis. Mauris non venenatis elit. Curabitur varius lectus nisl, vitae tempus felis tristique sit amet.",
			title: "Post 2",
			userId: user1.id,
			images: [
				"https://images.unsplash.com/photo-1672240344376-5bc45f00d13c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
				"https://images.unsplash.com/photo-1672329367841-537174916cf1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
			]
		}
	});

	const comment1 = await prisma.comment.create({
		data: {
			message: "I am a root comment",
			userId: user1.id,
			postId: post2.id
		}
	});

	await prisma.comment.create({
		data: {
			parentId: comment1.id,
			message: "I am a nested comment",
			userId: rheine.id,
			postId: post1.id
		}
	});

	await prisma.comment.create({
		data: {
			message: "I am another root comment",
			userId: user1.id,
			postId: post1.id
		}
	});
}

void seed();
